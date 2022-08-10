import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainModalModule } from 'src/app/shared/modals/main-modal/main-modal.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmationModalModule } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.module';

@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ConfirmationModalModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MainModalModule,
    FormsModule
  ],
  exports: [
    AddComponent,
    EditComponent,
    ListComponent,
    FormComponent
  ]
})
export class SignaletiqueModule { }
