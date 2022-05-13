import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercaseDirective]'
})
export class UppercaseDirectiveDirective {
  value: any = '';

  @HostListener('keyup', ['$event']) onInputChange($event: any) {
    this.value = $event.target.value.toUpperCase();
    this.displayUpperCaseValue(this.value)
  }
  
  constructor(private el: ElementRef) {
  }

  displayUpperCaseValue(value: any){
    this.el.nativeElement.value = value
  }



}
