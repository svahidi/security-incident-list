import {ElementRef, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  constructor(
    private el: ElementRef
  ) {
  }

  transform(value: string, search: string): unknown {
    console.log(';;;;;;', this.el, value);
    if (!value) return;
    // console.log('pipe', value)
    const re = new RegExp(search, 'gi');
    const match = value.match(re);
    if (!match || match.some(x => !x)) {
      return value;
    } else {
      this.el.nativeElement.innerHTML = value.replace(re, `<mark>${match[0]}</mark>`);

      return value.replace(re, `<mark>${match[0]}</mark>`);
    }
  }

}
