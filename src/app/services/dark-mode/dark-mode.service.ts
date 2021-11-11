import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  constructor() { }

  // Toggle between themes
  toggleDarkMode(theme: any) {
    theme == 'light' && this.addDarkMode()
    theme == 'dark' && this.removeDarkMode()
  }

  // Add dark mode
  addDarkMode() {
    let mainBody = document.querySelector('body');

    mainBody?.classList.add('darkmode-activated');
    localStorage.setItem('theme', 'dark')
  }

  // Remove dark mode
  removeDarkMode() {
    let mainBody = document.querySelector('body');

    mainBody?.classList.remove('darkmode-activated');
    localStorage.setItem('theme', 'light')
  }

}
