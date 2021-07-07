import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratComponent } from './contrat/contrat.component';
import { FormContratComponent } from './form-contrat/form-contrat.component';
import { EditContratComponent } from './edit-contrat/edit-contrat.component';
import { ListContratComponent } from './list-contrat/list-contrat.component';
import { DetailContratComponent } from './detail-contrat/detail-contrat.component';
import { ConfirmationModalModule } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.module';
import { MainModalModule } from 'src/app/shared/modals/main-modal/main-modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [
  { path: '', component: ContratComponent },
  { path: 'list/list/:id', component: DetailContratComponent },
  { path: 'list', component: ListContratComponent }
];

@NgModule({
  declarations: [
    ContratComponent,
    FormContratComponent,
    EditContratComponent,
    ListContratComponent,
    DetailContratComponent
  ],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    ReactiveFormsModule,
    MainModalModule,
    ConfirmationModalModule
  ]
})
export class ContratModule { }
