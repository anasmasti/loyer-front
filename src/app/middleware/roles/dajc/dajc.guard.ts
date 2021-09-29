import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DAJCGuard implements CanActivate {
  
  role!: string;

  constructor(public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.role = 'DAJC'

    if (this.role != 'DAJC') {
      this.router.navigate(['/access-denied', 'DAJC']);
      return false;
    }

    return true;
  }

}
