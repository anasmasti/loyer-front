import { AppState } from './../../../store/app.state';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { setLoadingAction } from 'src/app/store/shared/shared.action';
import { map, mergeMap } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { getUsersAction, getUsersSuccessAction } from './admin.actions';
import { User } from 'src/app/models/User';

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private userService: AdminService,
        private store: Store<AppState>
    ) { }

    // Create effect for users
    loadUsers$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(getUsersAction),
            mergeMap(() => this.loadUsers())
        )
    });


    ///////////////////////////////////////////////////////////////////

    // Load Users from service
    loadUsers() {
        return this.userService.getUsersList().pipe(
            map(
                (users: User[]) => {
                    this.store.dispatch(setLoadingAction({ status: false }))
                    return getUsersSuccessAction({ users });
                }
            )
        )
    }
}