import { ComingSoonModule } from './../../shared/coming-soon/coming-soon.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNotificationsComponent } from './main-notifications/main-notifications.component';

const route: Routes = [
  { path: '', component: MainNotificationsComponent }
];

@NgModule({
  declarations: [MainNotificationsComponent],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    ComingSoonModule
  ],
  exports: [
    MainNotificationsComponent
  ]
})

export class MainNotificationsModule { }
