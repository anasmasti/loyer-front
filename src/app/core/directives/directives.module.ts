import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseDirectiveDirective } from './uppercase-directive.directive';



@NgModule({
  declarations: [
    UppercaseDirectiveDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UppercaseDirectiveDirective
  ]
})
export class DirectivesModule { }
