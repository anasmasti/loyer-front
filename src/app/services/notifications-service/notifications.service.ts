import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Notif } from 'src/app/models/Notification';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  param_url: string = 'notifications';

  getLatestNotifications(matricule: any): Observable<Notif[]> {
    return this.http.get<Notif[]>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/latest/${matricule}`
    ); 
  }

  getAllNotifications(matricule: any): Observable<Notif[]> {
    return this.http.get<Notif[]>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/all/${matricule}`
    ); 
  }

  getNotificationsCount(matricule: any): Observable<number> {
    return this.http.get<number>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/count/${matricule}`
    ); 
  }
}
