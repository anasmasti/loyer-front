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
    this.notif.getAllNotifications(this.userMatricule).subscribe(
      (notifs) => {
        if (notifs) this.notifications = notifs;
        if (!notifs) this.hasError = true;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
