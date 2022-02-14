import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportingsComponent } from './reportings.component';

const route: Routes = [
  { path: '', component: ReportingsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
  ]
})
export class ReportingsModule { }
