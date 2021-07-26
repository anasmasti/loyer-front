import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainModalComponent } from './main-modal.component';
import { LfFormComponent } from 'src/app/pages/lieux-page/forms/lf-form/lf-form.component';



@NgModule({
  declarations: [MainModalComponent],
  imports: [
    CommonModule,
    
  ],
  exports: [MainModalComponent],
})
export class MainModalModule { 
}
