import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignProprietairePageComponent } from './assign-proprietaire-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormAssignComponent } from './form-assign/form-assign.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationModalModule } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.module';
import { MainModalModule } from 'src/app/shared/modals/main-modal/main-modal.module';

const route: Routes = [
  { path: ':id_contrat', component: AssignProprietairePageComponent },
];

@NgModule({
  declarations: [AssignProprietairePageComponent, FormAssignComponent],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    ReactiveFormsModule,
    ConfirmationModalModule,
    FormsModule,
    MainModalModule,
  ],
  exports: [AssignProprietairePageComponent],
})
export class AssignProprietaireModule {}
