import { DarkModeService } from './services/dark-mode/dark-mode.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { getUserTypeAction } from './store/shared/shared.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  theme: any = localStorage.getItem('theme');

  constructor(
    private darkModeService: DarkModeService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.getUserType();
    !this.theme && localStorage.setItem('theme', 'light');
    this.theme == 'dark' && this.darkModeService.addDarkMode();
    this.theme == 'light' && this.darkModeService.removeDarkMode();
  }

  getUserType() {
    this.store.dispatch(getUserTypeAction());
  }
}
