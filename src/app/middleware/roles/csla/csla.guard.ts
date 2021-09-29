import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CSLAGuard implements CanActivate {
  
  role!: string;

  constructor(public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.role = 'CSLA'

    if (this.role != 'CSLA') {
      this.router.navigate(['/access-denied', 'CSLA']);
      return false;
    }

    return true;
  }

}
