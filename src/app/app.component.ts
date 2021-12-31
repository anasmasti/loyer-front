import { DarkModeService } from './services/dark-mode/dark-mode.service';
import { Component, OnInit } from '@angular/core';
// import testData from './db.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {



  constructor(
    private darkModeService: DarkModeService
  ) { }

  theme: any = localStorage.getItem('theme')

  ngOnInit() {
    !this.theme && localStorage.setItem('theme', 'light')
    this.theme == 'dark' && this.darkModeService.addDarkMode();
    this.theme == 'light' && this.darkModeService.removeDarkMode();
  }
}
