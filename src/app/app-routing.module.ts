import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckRolesGuard } from './middleware/roles/check-roles.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/dashboard-page/dashboard.module').then(m => m.DashboardModule) },
  { path: 'proprietaire', loadChildren: () => import('./pages/proprietaire-page/proprietaire.module').then(m => m.ProprietaireModule), canActivate: [CheckRolesGuard] },
  { path: 'lieux', loadChildren: () => import('./pages/lieux-page/lieux.module').then(m => m.LieuxModule) },
  { path: 'notification', loadChildren: () => import('./pages/notification/main-notifications.module').then(m => m.MainNotificationsModule) },
  { path: 'contrat', loadChildren: () => import('./pages/contrat-page/contrat.module').then(m => m.ContratModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin-panel/admin-panel.module').then(m => m.AdminPanelModule) },
  { path: 'foncier', loadChildren: () => import('./pages/foncier-page/foncier-page.module').then(m => m.FoncierPageModule) },
  { path: '**', loadChildren: () => import('./pages/notfound-page/notfound-page.module').then(m => m.NotfoundPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
