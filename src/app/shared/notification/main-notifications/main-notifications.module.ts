import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNotificationsComponent } from './main-notifications.component';

const route: Routes = [
  { path: '', component: MainNotificationsComponent }
];

@NgModule({
  declarations: [MainNotificationsComponent],
  imports: [
    RouterModule.forChild(route),
    CommonModule
  ],
  exports: [
    MainNotificationsComponent
  ]
})

export class MainNotificationsModule { }
