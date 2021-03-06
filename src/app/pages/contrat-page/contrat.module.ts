import { LieuxEffects } from './../lieux-page/lieux-store/lieux.effect';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ContratComponent } from './contrat/contrat.component';
import { FormContratComponent } from './form-contrat/form-contrat.component';
import { EditContratComponent } from './edit-contrat/edit-contrat.component';
import { ListContratComponent } from './list-contrat/list-contrat.component';
import { DetailContratComponent } from './detail-contrat/detail-contrat.component';
import { ConfirmationModalModule } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.module';
import { MainModalModule } from 'src/app/shared/modals/main-modal/main-modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { lieuxReducer } from '../lieux-page/lieux-store/lieux.reducer';
import { StoreModule } from '@ngrx/store';
import { foncierReducer } from '../foncier-page/foncier-store/foncier.reducer';
import { FoncierEffects } from '../foncier-page/foncier-store/foncier.effect';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListReportingContratComponent } from './list-reporting-contrat/list-reporting-contrat.component';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeFr);


const route: Routes = [
  { path: ':id_foncier', component: ContratComponent },
  { path: 'list-global/list/list/:id', component: DetailContratComponent },
  { path: 'list-global/list', component: ListContratComponent },
  { path: 'list/edit/:id', component: EditContratComponent },
  { path: 'list-global/list/list-reporting', component: ListReportingContratComponent }
];

@NgModule({
  declarations: [
    ContratComponent,
    FormContratComponent,
    EditContratComponent,
    ListContratComponent,
    DetailContratComponent,
    ListReportingContratComponent
  ],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    ReactiveFormsModule,
    MainModalModule,
    ConfirmationModalModule,
    FormsModule,
    StoreModule.forFeature('lieux', lieuxReducer),
    StoreModule.forFeature('foncier', foncierReducer),
    EffectsModule.forFeature([LieuxEffects, FoncierEffects]),
    NgxPaginationModule,
    PipesModule
  ],
  providers: [ {provide: LOCALE_ID, useValue: "fr-FR" } ]
})
export class ContratModule {}
