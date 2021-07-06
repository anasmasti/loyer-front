import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderNavbarComponent } from './components/layout/header-navbar/header-navbar.component';
import { SideNavbarComponent } from './components/layout/side-navbar/side-navbar.component';
import { MainContentComponent } from './components/layout/main-content/main-content.component';
import { HttpClientModule } from '@angular/common/http';
import { DrFormComponent } from './pages/lieux-page/forms/dr-form/dr-form.component';
import { PvFormComponent } from './pages/lieux-page/forms/pv-form/pv-form.component';
import { SiegeFormComponent } from './pages/lieux-page/forms/siege-form/siege-form.component';
import { LfFormComponent } from './pages/lieux-page/forms/lf-form/lf-form.component';
import { SvFormComponent } from './pages/lieux-page/forms/sv-form/sv-form.component';
import { LieuxComponent } from './pages/lieux-page/lieux/lieux.component';
import { DetailLieuxComponent } from './pages/lieux-page/detail-lieux/detail-lieux.component';
import { EditLieuxComponent } from './pages/lieux-page/edit-lieux/edit-lieux.component';
import { ListLieuxComponent } from './pages/lieux-page/list-lieux/list-lieux.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderNavbarComponent,
    SideNavbarComponent,
    MainContentComponent,
    DrFormComponent,
    PvFormComponent,
    SiegeFormComponent,
    LfFormComponent,
    SvFormComponent,
    LieuxComponent,
    DetailLieuxComponent,
    EditLieuxComponent,
    ListLieuxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
