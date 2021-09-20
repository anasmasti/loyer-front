import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DCGuard implements CanActivate {

  role!: string;

  constructor(public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.role = 'll'
    // this.isAuth = false

    if (this.role != 'DC') {
      this.router.navigate(['/access-denied', 'DC']);
      return false;
    }

    return true;
  }

}
