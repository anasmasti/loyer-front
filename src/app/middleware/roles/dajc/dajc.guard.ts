import { AuthService } from 'src/app/services/auth-service/auth.service';
import { HelperService } from './../../../services/helpers/helper.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DAJCGuard implements CanActivate {

  isLogged!: boolean;
  isDAJC!: boolean;

  constructor(
    public router: Router,
    public authService: AuthService,
    private helperService: HelperService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.isDAJC = this.authService.checkUserRole('DAJC');
    this.isLogged = this.authService.isLoggedIn()

    if (this.isLogged) {
      if (!this.isDAJC) {
        this.router.navigate(['/access-denied', 'DAJC'])
          .then(() => {
            this.helperService.refrechPage()
          });

        return false;
      }
    }

    return true;
  }

}
