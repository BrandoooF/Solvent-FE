import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  constructor(el: ElementRef) {
    //console.log('DIRECTIVE FIRED')
    //el.nativeElement.style.height = auto;
   }

}
