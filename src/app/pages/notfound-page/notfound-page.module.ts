import { RouterModule, Routes } from '@angular/router';
import { NotfoundPageComponent } from './notfound-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  { path: '', component: NotfoundPageComponent }
]


@NgModule({
  declarations: [NotfoundPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NotfoundPageModule { }
