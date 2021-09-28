import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  param_url: string = 'auth';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    }),
  };

  logIn(Matricule: any) {
    return this.http.get(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/${Matricule}`);
  }

  isLoggedIn(): boolean {
    let authPass = localStorage.getItem('user');
    return (authPass !== null) ? true : false;
  }

  logOut() {
    if (localStorage.removeItem('user') == null) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }


}
