import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { AdminComponent } from './admin/admin.component';
import { DetailComponent } from './detail/detail.component';
import { ConfirmationModalModule } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.module';
import { MainModalModule } from 'src/app/shared/modals/main-modal/main-modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from './admin-store/admin.reducer';
import { UsersEffects } from './admin-store/admin.effect';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  { path: '', component: AdminComponent },
  { path: 'list/:id', component: DetailComponent },
  { path: 'list', component: ListComponent }
];

@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    AdminComponent,
    DetailComponent,
    EditComponent
  ],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    ReactiveFormsModule,
    MainModalModule,
    ConfirmationModalModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects]),
    NgxPaginationModule,
    FormsModule
  ]
})
export class AdminPanelModule { }
