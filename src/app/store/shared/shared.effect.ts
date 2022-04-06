import { AppState } from './../app.state';
import {
  fillUserTypeAction,
  getAllCountsSuccessAction,
  getCitiesAction,
  getCitiesSuccessAction,
  getUserTypeAction,
} from './shared.action';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  getAllCountsAction,
  setLoadingAction,
} from 'src/app/store/shared/shared.action';
import { map, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class SharedEffects {
  user: any = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '')
    : [];
  userRole: any[] = localStorage.getItem('user')
    ? this.user.existedUser.userRoles
    : [];

  constructor(
    private actions$: Actions,
    private helperervice: HelperService,
    private store: Store<AppState>
  ) {}

  // Create effect for all counts
  loadAllCounts$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(getAllCountsAction),
      mergeMap(() => this.loadAllCounts())
    );
  });

  // Create effect for all coutries
  loadCities$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(getCitiesAction),
      mergeMap(() => this.loadCities())
    );
  });

  //Fill userType
  loadUserType$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(getUserTypeAction),
      mergeMap(() => this.loadUserType())
    );
  });

  ///////////////////////////////////////////////////////////////////

  // Load all counts from service
  loadAllCounts() {
    return this.helperervice.getAllCounts().pipe(
      map((all_counts: any) => {
        if (all_counts.length !== 0) {
          this.store.dispatch(setLoadingAction({ status: false }));
          return getAllCountsSuccessAction({ all_counts });
        } else {
          throw new Error("Il y'a aucun Lieu");
        }
      })
    );
  }

  // Load countries from service
  loadCities() {
    return this.helperervice.getCities().pipe(
      map((cities: any) => {
        if (cities.length !== 0) {
          this.store.dispatch(setLoadingAction({ status: false }));
          return getCitiesSuccessAction({ cities });
        } else {
          throw new Error("Il y'a aucun pays");
        }
      })
    );
  }

  // Fill userType from local storage
 loadUserType() {
    let userType: string[] = [];
    this.userRole.forEach((element) => {
      userType.push(element.roleCode);
    });
     this.store.dispatch(fillUserTypeAction({ user_type: userType }));
    
   return EMPTY
  }
}
