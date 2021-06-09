import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProprietaireComponent } from './proprietaire/proprietaire.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsProprietaireComponent } from './details-proprietaire/details-proprietaire.component';
import { ListProprietaireComponent } from './list-proprietaire/list-proprietaire.component';


const route: Routes = [
  { path: '', component: ProprietaireComponent },
  { path: 'list/list/:id', component: DetailsProprietaireComponent },
  { path: 'list', component: ListProprietaireComponent }
];

@NgModule({
  declarations: [
    ProprietaireComponent,
    DetailsProprietaireComponent,
    ListProprietaireComponent
  ],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    ReactiveFormsModule
  ],
})
export class ProprietaireModule { }
