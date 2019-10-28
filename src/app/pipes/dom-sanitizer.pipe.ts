import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(img: string): SafeStyle {
    const domImg = `background-image: url('${img}')`;
    return this.domSanitizer.bypassSecurityTrustStyle(domImg);
  }

}
