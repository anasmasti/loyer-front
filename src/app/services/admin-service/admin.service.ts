import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/User';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  param_url: string = 'user';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    })
  };

  // Post new UserRole
  addUser(data: User): Observable<User> {
    return this.http.post<User>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/ajouter`, data,
      { 'headers': this.httpOptions.headers }
    );
  }

  //getUsers list 
  getUsersList(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/all `, { 'headers': this.httpOptions.headers });
  }

   // Get user by id 
   getUserById(id: String): Observable<User> {
    return this.http.get<User>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/detail/${id} `, { 'headers': this.httpOptions.headers });
  }

  //delete user 
  deleteUserById(id: String) {
    return this.http.get(`${environment.API_URL_TEST + environment.API_VERSION + + this.param_url}/delete/${id}`, { 'headers': this.httpOptions.headers });
  }

}
