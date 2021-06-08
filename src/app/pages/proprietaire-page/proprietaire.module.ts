import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProprietaireComponent } from './proprietaire/proprietaire.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsProprietaireComponent } from './details-proprietaire/details-proprietaire.component';

const route: Routes = [{ path: '', component: ProprietaireComponent }];

@NgModule({
  declarations: [ProprietaireComponent, DetailsProprietaireComponent],
  imports: [RouterModule.forChild(route), CommonModule, ReactiveFormsModule],
})
export class ProprietaireModule {}
