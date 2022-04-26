import { InterceptorConfig } from './interceptors/config';
import { HeaderNavbarModule } from './components/layout/header-navbar/header-navbar.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SideNavbarComponent } from './components/layout/side-navbar/side-navbar.component';
import { MainContentComponent } from './components/layout/main-content/main-content.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/layout/footer/footer.component';
import { environment } from 'src/environments/environment';
import { appReducer } from './store/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { ReportingsComponent } from './pages/reportings/reportings.component';
import { SharedEffects } from './store/shared/shared.effect';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SideNavbarComponent,
    MainContentComponent,
    FooterComponent,
    ReportingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HeaderNavbarModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([SharedEffects]),
    environment.production == true ? [] : StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    DatePipe,
    InterceptorConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
