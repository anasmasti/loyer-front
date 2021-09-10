import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }


  param_url: string = 'auth';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    }),
  };

  logIn() {
    return this.http.get(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}`);
  }

  logOut() {

  }


}
