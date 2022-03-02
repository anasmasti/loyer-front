import { ConfirmationModalModule } from './../../shared/modals/confirmation-modal/confirmation-modal.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesGenerationComponent } from './files-generation.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { PipesModule } from 'src/app/core/pipes/pipes.module';

const route: Routes = [
  { path: '', component: FilesGenerationComponent },
];

@NgModule({
  declarations: [FilesGenerationComponent],
  imports: [
    CommonModule,
    ConfirmationModalModule,
    RouterModule.forChild(route),
    FormsModule,
    ReactiveFormsModule,
    // PipesModule
  ]
})
export class FilesGenerationModule { }
