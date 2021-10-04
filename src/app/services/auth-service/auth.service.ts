import { HelperService } from './../helpers/helper.service';
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
    public router: Router,
    public helperService: HelperService,
  ) { }

  param_url: string = 'auth';
  user: any = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : [];
  roles: any[] = localStorage.getItem('user') ? this.user.existedUser.userRoles : []
  structuredRoles: any[] = []

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
      this.router.navigate(['/login']).then(() => {
        this.helperService.refrechPage()
      });

    }
  }

  checkUserRole(role: string) {
    let hasAccess: boolean

    if (this.user) {
      if (this.roles) {
        this.roles.forEach(role => {
          this.structuredRoles.push(role.roleCode)
        })
        hasAccess = this.structuredRoles.includes(role)
        if (hasAccess) {
          return true
        }
      }
    }
    return false
  }
}
