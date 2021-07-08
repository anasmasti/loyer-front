import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { AdminComponent } from './admin/admin.component';
import { DetailComponent } from './detail/detail.component';
import { ConfirmationModalModule } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.module';
import { MainModalModule } from 'src/app/shared/modals/main-modal/main-modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [
  { path: '', component: AdminComponent },
  { path: 'list/list/:id', component: DetailComponent },
  { path: 'list', component: ListComponent }
];

@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    AdminComponent,
    DetailComponent
  ],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    ReactiveFormsModule,
    MainModalModule,
    ConfirmationModalModule
  ]
})
export class AdminPanelModule { }
