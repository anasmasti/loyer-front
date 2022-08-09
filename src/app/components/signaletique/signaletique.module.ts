import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainModalModule } from 'src/app/shared/modals/main-modal/main-modal.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmationModalModule } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    DetailComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ConfirmationModalModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MainModalModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    AddComponent,
    EditComponent,
    DetailComponent,
    ListComponent,
    FormComponent
  ]
})
export class SignaletiqueModule { }
