import { RouterModule } from '@angular/router';
import { ConfirmationModalModule } from './../../../shared/modals/confirmation-modal/confirmation-modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavbarComponent } from './header-navbar.component';



@NgModule({
  declarations: [
    HeaderNavbarComponent
  ],
  imports: [
    CommonModule,
    ConfirmationModalModule,
    RouterModule
  ],
  exports: [HeaderNavbarComponent],
})

export class HeaderNavbarModule { }
