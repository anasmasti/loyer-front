import { SharedEffects } from './../../store/shared/shared.effect';
import { ComingSoonModule } from './../../shared/coming-soon/coming-soon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

const route: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    ComingSoonModule,
    EffectsModule.forFeature([SharedEffects]),
  ]
})
export class DashboardModule { }
