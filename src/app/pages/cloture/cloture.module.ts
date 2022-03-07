import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClotureComponent } from './cloture.component';
import { ConfirmationModalModule } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

const route: Routes = [
  { path: '', component: ClotureComponent},
];

@NgModule({
  declarations: [ClotureComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ConfirmationModalModule,
    PipesModule
  ]
})
export class ClotureModule { }
