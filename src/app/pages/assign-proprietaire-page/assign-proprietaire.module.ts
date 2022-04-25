import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignProprietairePageComponent } from './assign-proprietaire-page.component';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [
  { path: '', component: AssignProprietairePageComponent },
];

@NgModule({
  declarations: [AssignProprietairePageComponent],
  imports: [RouterModule.forChild(route), CommonModule],
  exports: [AssignProprietairePageComponent]
})
export class AssignProprietaireModule {}
