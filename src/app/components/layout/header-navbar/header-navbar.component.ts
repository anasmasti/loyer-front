import { ConfirmationModalService } from './../../../services/confirmation-modal-service/confirmation-modal.service';
import { DarkModeService } from './../../../services/dark-mode/dark-mode.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { NotificationsService } from 'src/app/services/notifications-service/notifications.service';
import { take } from 'rxjs/operators';
import { HelperService } from '@services/helpers/helper.service';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss'],
})
export class HeaderNavbarComponent implements OnInit {
  id: string = 'Deconnecter';
  user: any = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '')
    : [];
  userRole: any[] = localStorage.getItem('user')
    ? this.user.existedUser.userRoles
    : [];
  userMatricule: any = localStorage.getItem('matricule');

  theme!: any;

  notifCount!: number;
  notifCountError!: number;


  constructor(
    private darkModeService: DarkModeService,
    private authService: AuthService,
    private confirmationModalService: ConfirmationModalService,
    private notif: NotificationsService,
  ) {}

  ngOnInit(): void {
    this.getNotificationCount();

  }

  doDarkMode() {
    this.theme = localStorage.getItem('theme');
    this.darkModeService.toggleDarkMode(this.theme);
  }

  logout() {
    this.authService.logOut();
  }

  openConfirmationModal() {
    this.confirmationModalService.open(this.id); // Open delete confirmation modal
  }

  // Close confirmation modal
  closeConfirmationModal() {
    this.confirmationModalService.close(this.id); // Close delete confirmation modal
  }

  getNotificationCount() {
    this.notif.getNotificationsCount(this.userMatricule).subscribe(
      (count) => {
        this.notifCount = count;
      },
      (error) => {
        this.notifCountError = error;
      }
    );
  }


}
