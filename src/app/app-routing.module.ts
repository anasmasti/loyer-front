import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'proprietaire', loadChildren: () => import('./pages/proprietaire-page/proprietaire.module').then(m => m.ProprietaireModule) },
  { path: '**', loadChildren: () => import('./pages/notfound-page/notfound-page.module').then(m => m.NotfoundPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
