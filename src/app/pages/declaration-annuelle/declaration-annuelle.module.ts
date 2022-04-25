import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DeclarationAnnuelleComponent } from './declaration-annuelle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const route: Routes = [
  { path: '', component: DeclarationAnnuelleComponent },
];


@NgModule({
  declarations: [DeclarationAnnuelleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DeclarationAnnuelleModule { }
