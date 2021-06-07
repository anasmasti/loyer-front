import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProprietaireComponent } from './proprietaire.component';
import {ReactiveFormsModule} from '@angular/forms'

const route: Routes = [
  { path: '', component: ProprietaireComponent }
]

@NgModule({
  declarations: [ProprietaireComponent],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProprietaireModule { }
