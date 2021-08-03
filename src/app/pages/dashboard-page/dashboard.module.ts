import { ComingSoonModule } from './../../shared/coming-soon/coming-soon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    ComingSoonModule
  ]
})
export class DashboardModule { }
