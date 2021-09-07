import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { MainModalModule } from 'src/app/shared/modals/main-modal/main-modal.module';

const routes: Routes = [
  { path: '', component: LoginPageComponent }
]

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MainModalModule
  ]
})
export class LoginModule { }
