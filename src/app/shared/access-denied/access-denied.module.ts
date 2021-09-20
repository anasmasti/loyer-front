import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessDeniedComponent } from './access-denied.component';
import { RouterModule, Routes } from '@angular/router';
import { MainModalModule } from '../modals/main-modal/main-modal.module';
import { ReactiveFormsModule } from '@angular/forms';

const route: Routes = [
  { path: ':role', component: AccessDeniedComponent },
];

@NgModule({
  declarations: [AccessDeniedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
    MainModalModule
  ],
  exports: [
    AccessDeniedComponent
  ]
})

export class AccessDeniedModule { }
