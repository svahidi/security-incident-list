import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from './classes/environment';
import { Info } from './classes/api-config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private serverHost = environment.default.serverHost;
  private serverPort = environment.default.serverPort;
  private url: string;
  constructor(
    private http: HttpClient,
  ) { }

  getInfo(apiAddress = '') {
    if (apiAddress && apiAddress.length && environment.hasOwnProperty(apiAddress)) {
      this.serverHost = environment[apiAddress].serverHost;
      this.serverPort = environment[apiAddress].serverPort;
    }
    return JSON.parse(JSON.stringify(Info));
  }

  setHeader(setToken, contentType = 'application/json') {
    if (setToken) {
      return {
        headers: new HttpHeaders({
          // 'Content-Type':  contentType,
          // authorization: this.loginState.getToken()
        })
      };
    } else {
      return {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          // 'authorization': 'Basic c192YWhpZGlAb3V0bG9vay5jb206MDQzMTMxNjI3OA=='
        })
      };
    }
  }

  callApi(path, setToken = true, returnError = false ) {
    if (!path.cache) {
      this.url = this.makeUrl(path);
    } else {
      setToken = false;
      this.url = path.url;
      return this.getFromJson(path);
    }
    switch (path.method) {
      case 'post':
        return this.postMethod(path, setToken, returnError);
      case 'get':
        return this.getMethod(path, setToken, returnError);
    }
  }

  private extractData(data) {
    if (data.statusCode === 200) {
      return data || {};
    } else {
      // TODO push the error as notification
      return false;
    }
  }

  private postMethod(path, setToken, returnError) {
    return new Observable(res => {
      this.http.post<any>(this.url, path.body, {headers: this.setHeader(setToken).headers})
        .subscribe(data => {
          res.next(this.extractData(data));
        }, (err: HttpErrorResponse) => {
          this.errorHandling(err);
          if (returnError) {
            res.next(false);
          }
        });
    });

  }

  private getMethod(path, setToken, returnError) {
    if (path.body) {
      path.body = this.makeQueryString(path.body);
    }
    return new Observable(res => {
      this.http.get<any>(this.url, {params: path.body, headers: this.setHeader(setToken).headers})
        .subscribe(data => {
          res.next(data);
        }, (err: HttpErrorResponse) => {
          this.errorHandling(err);
          if (returnError) {
            res.next(false);
          }
        });
    });
  }

  private makeUrl(path) {
    if (!(path && path.url)) {
      alert('there is not set any Address for API');
    }
    if (path && path.url) {
      return `${this.serverHost}:${this.serverPort}/${path.url}`;
    }
  }

  private makeQueryString(params) {
    Object.keys(params)
      .filter(field => !params[field])
      .forEach(item => {
        delete params[item];
      });
    return params;
  }

  private errorHandling(err) {
    // this.loginState.showSpinner(false);**
    if (err.error instanceof Error) {
      // A client-side or network error occurred.
      // this.messageBox.error('client side error: ' + err.error.message);
    } else {
      // Backend returns unsuccessful response codes such as 404, 500 etc.
      if (err && err.error &&
        ((err.error.code === -4 || err.error.code === -5 || err.error.code === -6) ||
          (err.error.hasOwnProperty('errors') && err.error.errors && err.error.errors.length))) {
        return;
      }
      if (err && err.error) {
        if (err.error.message) {
          // TODO push the error as notification
        } else {
          // TODO push the error as notification
        }
      } else {
        // TODO push the error as notification
      }

    }
  }

  private getFromJson(path) {
    return new Observable(res => {
      this.http.get<any>(this.url, {params: path.body})
        .subscribe(data => {
          const newData = JSON.parse(JSON.stringify(data));
          if (path.body) {
            newData.paginationInfo.currentPage = path.body.currentPage - 1;
          }
          res.next(newData);
        }, (err: HttpErrorResponse) => {
          this.errorHandling(err);
        });
    });
  }

}
