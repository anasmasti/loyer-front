import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignaletiquePageComponent } from './signaletique-page.component';
import { SignaletiqueModule } from 'src/app/components/signaletique/signaletique.module';
import { DetailComponent } from 'src/app/components/signaletique/detail/detail.component';

const route: Routes = [
  { path: '', component: SignaletiquePageComponent},
  { path: 'details', component: DetailComponent},
];

@NgModule({
  declarations: [SignaletiquePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    SignaletiqueModule
  ]
})

export class SignaletiquePageModule { }
