import { HelperService } from './../../../services/helpers/helper.service';
import { AuthGuard } from './../../auth.guard';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CDGSPGuard implements CanActivate {

  isLogged!: boolean;
  isCDGSP!: boolean;

  constructor(
    public router: Router,
    public authService: AuthService,
    private helperService: HelperService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.isCDGSP = this.authService.checkUserRole('CDGSP');
    this.isLogged = this.authService.isLoggedIn()

    if (this.isLogged) {
      if (!this.isCDGSP) {
        this.router.navigate(['/access-denied', 'CDGSP'])
          .then(() => {
            this.helperService.refrechPage()
          });

        return false;
      }
    }

    return true;
  }

}
