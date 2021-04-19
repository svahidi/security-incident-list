import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() data = '';
  @Output() dataChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emptyDate() {
    this.data = '';
    this.dataChange.emit(this.data);
  }

}
