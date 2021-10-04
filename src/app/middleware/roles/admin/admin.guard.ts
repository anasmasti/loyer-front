import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { HelperService } from 'src/app/services/helpers/helper.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  isLogged!: boolean;
  isAdmin!: boolean;

  constructor(
    public router: Router,
    public authService: AuthService,
    private helperService: HelperService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.isAdmin = this.authService.checkUserRole('Admin');
    this.isLogged = this.authService.isLoggedIn()

    if (this.isLogged) {
      if (!this.isAdmin) {
        this.router.navigate(['/access-denied', 'Admin'])
          .then(() => {
            this.helperService.refrechPage()
          });

        return false;
      }
    }

    return true;
  }

}
