import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  constructor() { }

  toggleDarkMode() {
    let mainBody = document.querySelector('body');
    mainBody?.classList.toggle('darkmode-activated');
  }
}
