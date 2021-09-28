import { DarkModeService } from './../../../services/dark-mode/dark-mode.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss'],
})
export class HeaderNavbarComponent implements OnInit {
  constructor(private darkModeService: DarkModeService,
    private authService: AuthService) { }

  ngOnInit(): void { }

  doDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  logout() {
    this.authService.logOut()
  }
}
