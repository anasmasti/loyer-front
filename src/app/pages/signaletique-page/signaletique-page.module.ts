import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignaletiquePageComponent } from './signaletique-page.component';
import { ConfirmationModalModule } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MainModalModule } from 'src/app/shared/modals/main-modal/main-modal.module';

const route: Routes = [
  { path: '', component: SignaletiquePageComponent},
];

@NgModule({
  declarations: [SignaletiquePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ConfirmationModalModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MainModalModule,
    FormsModule
  ]
})

export class SignaletiquePageModule { }
