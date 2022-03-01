import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './middleware/auth.guard';
import { AdminGuard } from './middleware/roles/admin/admin.guard';
import { CDGSPGuard } from './middleware/roles/cdgsp/cdgsp.guard';
import { CSLAGuard } from './middleware/roles/csla/csla.guard';
import { DCGuard } from './middleware/roles/dc/dc.guard';
import { DAJCGuard } from './middleware/roles/dajc/dajc.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/dashboard-page/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'proprietaire',
    loadChildren: () =>
      import('./pages/proprietaire-page/proprietaire.module').then(
        (m) => m.ProprietaireModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'lieux',
    loadChildren: () =>
      import('./pages/lieux-page/lieux.module').then((m) => m.LieuxModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./pages/notification/main-notifications.module').then(
        (m) => m.MainNotificationsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'contrat',
    loadChildren: () =>
      import('./pages/contrat-page/contrat.module').then(
        (m) => m.ContratModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin-panel/admin-panel.module').then(
        (m) => m.AdminPanelModule
      ),
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'foncier',
    loadChildren: () =>
      import('./pages/foncier-page/foncier-page.module').then(
        (m) => m.FoncierPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login-page/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'access-denied',
    loadChildren: () =>
      import('./shared/access-denied/access-denied.module').then(
        (m) => m.AccessDeniedModule
      ),
  },
  {
    path: 'files',
    loadChildren: () =>
      import('./pages/files-generation/files-generation.module').then(
        (m) => m.FilesGenerationModule
      ),
      canActivate: [AuthGuard, DCGuard]
  },
  {
    path: 'reportings',
    loadChildren: () =>
      import('./pages/reportings/reportings.module').then(
        (m) => m.ReportingsModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/user-profile-page/user-profile-page.module').then(
        (m) => m.UserProfilePageModule
      )
  },
  {
    path: 'situation',
    loadChildren: () =>
      import('./pages/situation-cloture/situation-cloture.module').then(
        (m) => m.SituationClotureModule
      )
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/notfound-page/notfound-page.module').then(
        (m) => m.NotfoundPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
