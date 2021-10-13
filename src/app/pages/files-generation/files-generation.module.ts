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
    RouterModule.forChild(route),
  ]
})
export class FilesGenerationModule { }
