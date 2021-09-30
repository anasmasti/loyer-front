import { AppState } from './../../../store/app.state';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getDrWithSupAction, getDrWithSupSuccessAction, getLieuxAction, getLieuxSuccessAction, setLieuxErrorAction } from "./lieux.actions";
import { Store } from '@ngrx/store';
import { Lieu } from 'src/app/models/Lieu';
import { Injectable } from '@angular/core';
import { setLoadingAction } from 'src/app/store/shared/shared.action';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class LieuxEffects {

    userMatricule: any = localStorage.getItem('matricule')

    constructor(
        private actions$: Actions,
        private lieuxService: LieuxService,
        private store: Store<AppState>
    ) { }

    // Create effect for Lieux
    loadLieux$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(getLieuxAction),
            mergeMap(() => this.loadLieux())
        )
    });

    // Create effect for Dr with Sup
    loadDrWithSup$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(getDrWithSupAction),
            mergeMap(() => this.loadDrWithSup())
        )
    });

    ///////////////////////////////////////////////////////////////////

    // Load lieux from service
    loadLieux() {
        return this.lieuxService.getLieux(this.userMatricule).pipe(
            map(
                (lieux: Lieu[]) => {
                    if (lieux.length !== 0) {
                        this.store.dispatch(setLoadingAction({ status: false }))
                        return getLieuxSuccessAction({ lieux });
                    } else {
                        throw new Error("Il y'a aucun Lieu")
                    }
                }
            ),
            catchError((error: any) => {
                this.store.dispatch(setLieuxErrorAction({ error: error.error.message }))
                return throwError(error.error.message)
            })
        )
    }
    // Load lieux from service
    loadDrWithSup() {
        return this.lieuxService.getDrSup(this.userMatricule).pipe(
            map(
                (DrWithSup: any) => {
                    if (DrWithSup.length !== 0) {
                        this.store.dispatch(setLoadingAction({ status: false }))
                        return getDrWithSupSuccessAction({ DrWithSup });
                    } else {
                        throw new Error("Il y'a aucun Direction régionale ou Supervision")
                    }
                }
            )
        )
    }
}