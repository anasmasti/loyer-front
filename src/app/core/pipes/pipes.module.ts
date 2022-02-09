import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getNameOfObject } from './getNameOfObject.pipe';
import { TransformNamePipe } from './transform-name.pipe';



@NgModule({
  declarations: [
    getNameOfObject,
    TransformNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    getNameOfObject,
    TransformNamePipe
  ]
})
export class PipesModule { }
