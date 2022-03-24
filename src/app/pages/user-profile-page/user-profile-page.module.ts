import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfilePageComponent } from './user-profile-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

let routes: Routes = [
  {
    path: '',
    component: UserProfilePageComponent,
  },
];
@NgModule({
  declarations: [UserProfilePageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class UserProfilePageModule {}
