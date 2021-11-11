import { ConfirmationModalService } from './../../../services/confirmation-modal-service/confirmation-modal.service';
import { DarkModeService } from './../../../services/dark-mode/dark-mode.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss'],
})

export class HeaderNavbarComponent implements OnInit {

  constructor(
    private darkModeService: DarkModeService,
    private authService: AuthService,
    private confirmationModalService: ConfirmationModalService
  ) { }

  id: string = 'Deconnecter'
  user: any = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : [];
  userRole: any[] = localStorage.getItem('user') ? this.user.existedUser.userRoles[0].roleName : []
  theme!: any

  ngOnInit(): void { }

  doDarkMode() {
    this.theme = localStorage.getItem('theme')
    this.darkModeService.toggleDarkMode(this.theme);
  }

  logout() {
    this.authService.logOut()
  }

  openConfirmationModal() {
    this.confirmationModalService.open(this.id); // Open delete confirmation modal
  }

  // Close confirmation modal
  closeConfirmationModal() {
    this.confirmationModalService.close(this.id); // Close delete confirmation modal
  }
}
