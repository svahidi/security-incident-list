import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertor'
})
export class ConvertorPipe implements PipeTransform {
  month = [
    {text: 'January', value: 1},
    {text: 'February', value: 2},
    {text: 'March', value: 3},
    {text: 'April', value: 4},
    {text: 'May', value: 5},
    {text: 'June', value: 6},
    {text: 'July', value: 7},
    {text: 'August', value: 8},
    {text: 'September', value: 9},
    {text: 'October', value: 10},
    {text: 'November', value: 11},
    {text: 'December', value: 12}
    ];
  transform(value: any, ...args: any[]): any {

    const today = new Date();
    const todayData: any = {year: today.getFullYear(), month: today.getMonth(), day: today.getDate(), hour: today.getHours(), minute: today.getMinutes()};
    const valueDate = new Date(value);
    const data: any = {year: valueDate.getFullYear(), month: valueDate.getMonth(), day: valueDate.getDate(), hour: valueDate.getHours(), minute: valueDate.getMinutes()};
    if (data.year === todayData.year && data.month === todayData.month && todayData.day === data.day) {
      return data.hour + ' : ' + (data.minute.toString().length < 2 ? '0' + data.minute : data.minute);
    } else if (data.year === todayData.year) {
      return this.month[data.month].text + ' ' + (data.day.toString().length < 2 ? '0' + data.day : data.day);
    } else {
      return new Date(value).toISOString().slice(0, 10).split('-').join('/');
    }
    console.log('>>>>>>>>>', value, args);
  }

}
