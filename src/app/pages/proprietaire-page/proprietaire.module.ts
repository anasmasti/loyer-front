import { ConfirmationModalModule } from './../../shared/modals/confirmation-modal/confirmation-modal.module';
import { MainModalModule } from './../../shared/modals/main-modal/main-modal.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProprietaireComponent } from './proprietaire/proprietaire.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsProprietaireComponent } from './details-proprietaire/details-proprietaire.component';
import { ListProprietaireComponent } from './list-proprietaire/list-proprietaire.component';
import { EditProprietaireComponent } from './edit-proprietaire/edit-proprietaire.component';
import { FormProprietaireComponent } from './form-proprietaire/form-proprietaire.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


const route: Routes = [
  { path: 'add/:id_foncier/:etat_ajout', component: ProprietaireComponent },
  { path: 'list-global/list/list/:id', component: DetailsProprietaireComponent },
  { path: 'list-global/list', component: ListProprietaireComponent }
];

@NgModule({
  declarations: [
    ProprietaireComponent,
    DetailsProprietaireComponent,
    ListProprietaireComponent,
    EditProprietaireComponent,
    FormProprietaireComponent
  ],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    ReactiveFormsModule,
    MainModalModule,
    ConfirmationModalModule,
    NgxPaginationModule,
    FormsModule
  ],
})
export class ProprietaireModule { }
