import { DarkModeService } from './../../../services/dark-mode/dark-mode.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss'],
})
export class HeaderNavbarComponent implements OnInit {
  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {}

  doDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
