import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarComponent} from './components/calendar/calendar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConvertorPipe } from './pipe/date/convertor.pipe';
import { SearchComponent } from './components/search/search.component';
import {MatInputModule} from '@angular/material/input';
import { HighlightPipe } from './pipe/highlight/highlight.pipe';

@NgModule({
  declarations: [
    CalendarComponent,
    ConvertorPipe,
    SearchComponent,
    HighlightPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    CalendarComponent,
    SearchComponent,
    ConvertorPipe,
    HighlightPipe
  ]
})
export class ToolsModule { }
