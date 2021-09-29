import { HelperService } from './../../../services/helpers/helper.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DCGuard implements CanActivate {

  isLogged!: boolean;
  isDC!: boolean;

  constructor(
    public router: Router,
    public authService: AuthService,
    private helperService: HelperService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.isDC = this.authService.checkUserRole('DC');
    this.isLogged = this.authService.isLoggedIn()

    if (this.isLogged) {
      if (!this.isDC) {
        this.router.navigate(['/access-denied', 'DC'])
          .then(() => {
            this.helperService.refrechPage()
          });

        return false;
      }
    }

    return true;
  }

}
