import { Component, OnInit } from '@angular/core';
import { Notif } from 'src/app/models/Notification';
import { NotificationsService } from 'src/app/services/notifications-service/notifications.service';

@Component({
  selector: 'app-main-notifications',
  templateUrl: './main-notifications.component.html',
  styleUrls: ['./main-notifications.component.scss'],
})
export class MainNotificationsComponent implements OnInit {
  userMatricule: any = localStorage.getItem('matricule');
  notifications!: Notif[];
  errorMessage!: string;
  hasError!: boolean;

  constructor(private notif: NotificationsService) {}

  ngOnInit(): void {
    this.hasError = false
    this.getNotifications();
  }

  getNotifications() {
    this.notif.getLatestNotifications(this.userMatricule).subscribe(
      (notifs) => {
        this.notifications = notifs;
      },
      (error) => {
        this.errorMessage = error;
        this.hasError = true
      }
    );
  }
}
