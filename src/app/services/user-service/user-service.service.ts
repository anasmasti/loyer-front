import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  param_url: string = 'user';

  constructor(private http: HttpClient) {}

  getUserInfo(): User {
    return JSON.parse(localStorage.getItem('user') || '').existedUser;
  }

  // Update user profile
  updateProfile(data: User, id: any, matricule: any): Observable<User> {
    return this.http.put<User>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/update-profile/${id}/${matricule}`,
      data
    );
  }
}
