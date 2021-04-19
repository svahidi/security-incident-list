import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

const format = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: format},
  ]
})
export class CalendarComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  selectedRange: any;

  @Output() dataChanged = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  changeDate() {
    if (this.range.value) {
      this.selectedRange = {
        startDate: this.range.value.start && this.range.value.start.hasOwnProperty('_d') ? this.range.value.start['_d'] : '',
        endDate: this.range.value.end && this.range.value.end.hasOwnProperty('_d') ? this.range.value.end['_d'] : '',
        start: this.range.value.start && this.range.value.start.hasOwnProperty('_i') ? this.range.value.start['_i'] : '',
        end: this.range.value.end && this.range.value.end.hasOwnProperty('_i') ? this.range.value.end['_i'] : ''};
    }
    this.dataChanged.emit(this.selectedRange);
  }

  emptyDate() {
    this.range.reset();
    this.selectedRange = {
      startDate: '',
      endDate: '',
      start: '',
      end: ''
    };
    this.dataChanged.emit(this.selectedRange);
  }

}
