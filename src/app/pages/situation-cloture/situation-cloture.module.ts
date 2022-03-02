import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SituationClotureComponent } from './situation-cloture.component';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { ConfirmationModalModule } from './../../shared/modals/confirmation-modal/confirmation-modal.module';
const route: Routes = [
  { path: '', component: SituationClotureComponent},
];

@NgModule({
  declarations: [SituationClotureComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ConfirmationModalModule,
    PipesModule
  ]
})
export class SituationClotureModule { }
