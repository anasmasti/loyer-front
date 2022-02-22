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
  dateNextCloture!: any;
  monthName!: string;

  constructor(
    private darkModeService: DarkModeService,
    private authService: AuthService,
    private confirmationModalService: ConfirmationModalService,
    private notif: NotificationsService,
    private help: HelperService
  ) {}

  ngOnInit(): void {
    this.getNotificationCount();
    this.getNextClotureDate();
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

  getNextClotureDate() {
    this.help.getNextClotureDate().subscribe((data) => {
      this.dateNextCloture = data;

      let months: any = this.help.getMounths();
      months.forEach((month: any) => {
        if (month.number == this.dateNextCloture.mois) {
          this.monthName = month.name;
        }
      });
    });
  }
}
