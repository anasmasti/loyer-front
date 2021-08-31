import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VersementComponent } from './versement/versement.component';
import { DetailVersementComponent } from './detail-versement/detail-versement.component';
import { ListVersementComponent } from './list-versement/list-versement.component';
import { EditVersementComponent } from './edit-versement/edit-versement.component';
import { FormVersementComponent } from './form-versement/form-versement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainModalModule } from 'src/app/shared/modals/main-modal/main-modal.module';
import { ConfirmationModalModule } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.module';

const route: Routes = [
  { path: '', component: VersementComponent },
  { path: 'list/list/:id', component: DetailVersementComponent },
  { path: 'list', component: ListVersementComponent },
  { path: 'list/edit/:id', component: EditVersementComponent },
];

@NgModule({
  declarations: [
    VersementComponent,
    FormVersementComponent,
    EditVersementComponent,
    ListVersementComponent,
    DetailVersementComponent,
  ],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    ReactiveFormsModule,
    MainModalModule,
    ConfirmationModalModule,
    FormsModule,
  ]
})
export class VersementModule { }
