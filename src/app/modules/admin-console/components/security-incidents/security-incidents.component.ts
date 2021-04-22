import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../../tools/services/api/http.service';
import {CommonService} from '../../../../tools/services/common/common.service';

@Component({
  selector: 'app-security-incidents',
  templateUrl: './security-incidents.component.html',
  styleUrls: ['./security-incidents.component.scss']
})
export class SecurityIncidentsComponent implements OnInit {

  data: any;
  recordsCount = 0;
  rows = [];
  searchData = '';
  selectedDate: any;

  constructor(
    private api: HttpService,
    public common: CommonService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const req = this.api.getInfo().admin.securityIncident;
    req.body = {};
    this.api.callApi(req, false).subscribe((res: any) => {
      this.data = res;
      this.cloneFullData();
      if (this.data && this.data.rowDefs) {
        this.recordsCount = res.rowDefs.length;
      }
    });
  }

  cloneFullData() {
    this.rows = JSON.parse(JSON.stringify(this.data.rowDefs));
  }

  filterData(event) {
    this.cloneFullData();
    this.selectedDate = event;
    if (event && event.hasOwnProperty('startDate') && event.hasOwnProperty('endDate') && event.startDate && event.endDate) {
      this.rows = this.rows.filter(x => new Date(x.date) >= new Date(event.startDate) && new Date(x.date) <= new Date(event.endDate));
      const findedElem = this.data.columnDefs.filter(x => x.hasOwnProperty('sorted') && x.sorted);
      if (findedElem && findedElem.length) {
        this.sortData(findedElem[0]);
      }
    }
    if (this.searchData) {
      this.filterDataByText(this.searchData);
    }
  }

  filterDataByText(event) {
    this.searchData = event;
    if (this.searchData) {
      this.rows = JSON.parse(JSON.stringify(this.data.rowDefs))
        .filter(x => x.from.toUpperCase().match(this.searchData.toUpperCase()) ||
          x.to.findIndex(y => y.toUpperCase().match(this.searchData.toUpperCase())) > -1 ||
          x.subject.data.toUpperCase().match(this.searchData.toUpperCase()));
    } else {
      this.filterData(this.selectedDate);
    }
  }

  getEmailsTooltip(items) {
    let tooltip = '';
    const data = JSON.parse(JSON.stringify(items));
    data.splice(1, data.length - 1).forEach((x, index) => {
      tooltip += x + (index + 1 !== items.length - 1 ? ', ' : '');
    });
    return tooltip;
  }

  sortData(col) {
    this.data.columnDefs.forEach(x => x.sorted = false);
    col.sorted = true;
    col.ascending = col.hasOwnProperty('ascending') ? !col.ascending : true;
    this.rows = this.rows.sort((a, b) => {
      const c: any = new Date(col.ascending ? b.date : a.date);
      const d: any = new Date(col.ascending ? a.date : b.date);
      return c - d;
    });
  }

  checkSorting(field) {
    return this.data.columnDefs.filter(x => x.field === field)[0].hasOwnProperty('sorted') &&
      this.data.columnDefs.filter(x => x.field === field)[0].sorted;
  }

  rowClicked(row) {
    row.ShowMore = row.hasOwnProperty('ShowMore') ? !row.ShowMore : true;
  }

}
