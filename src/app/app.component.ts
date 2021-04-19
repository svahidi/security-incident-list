import {Component, HostListener} from '@angular/core';
import {CommonService} from './tools/services/common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HENNGE-CHALLENGE';

  constructor(
    public common: CommonService
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.common.webView = window.innerWidth > 800;
    console.log(this.common.webView);
  }
}
