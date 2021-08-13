import { ConfirmationModalModule } from './../../shared/modals/confirmation-modal/confirmation-modal.module';
import { MainModalModule } from 'src/app/shared/modals/main-modal/main-modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoncierListComponent } from './foncier-list/foncier-list.component';
import { FoncierEditComponent } from './foncier-edit/foncier-edit.component';
import { FoncierDetailComponent } from './foncier-detail/foncier-detail.component';
import { FoncierComponent } from './foncier/foncier.component';
import { FoncierFormComponent } from './foncier-form/foncier-form.component';
import { foncierReducer } from './foncier-store/foncier.reducer';
import { FoncierEffects } from './foncier-store/foncier.effect';
import { NgxPaginationModule } from 'ngx-pagination';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


const route: Routes = [
  { path: '', component: FoncierComponent },
  { path: 'list/list/:id', component: FoncierDetailComponent },
  { path: 'list', component: FoncierListComponent },
  { path: 'list/edit/:id', component: FoncierEditComponent }
];


@NgModule({
  declarations: [
    FoncierComponent,
    FoncierDetailComponent,
    FoncierListComponent,
    FoncierEditComponent,
    FoncierFormComponent
  ],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    ReactiveFormsModule,
    MainModalModule,
    ConfirmationModalModule,
    StoreModule.forFeature('foncier', foncierReducer),
    EffectsModule.forFeature([FoncierEffects]),
    NgxPaginationModule
  ]
})
export class FoncierPageModule { }