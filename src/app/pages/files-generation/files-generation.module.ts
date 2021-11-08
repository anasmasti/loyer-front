import { ConfirmationModalModule } from './../../shared/modals/confirmation-modal/confirmation-modal.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesGenerationComponent } from './files-generation.component';

const route: Routes = [
  { path: '', component: FilesGenerationComponent },
];

@NgModule({
  declarations: [FilesGenerationComponent],
  imports: [
    CommonModule,
    ConfirmationModalModule,
    RouterModule.forChild(route),
  ]
})
export class FilesGenerationModule { }
