import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainModalComponent } from './main-modal.component';



@NgModule({
  declarations: [MainModalComponent],
  imports: [
    CommonModule
  ],
  exports: [MainModalComponent],
})
export class MainModalModule { }
