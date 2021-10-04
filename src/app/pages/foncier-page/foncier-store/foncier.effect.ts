import { FoncierService } from './../../../services/foncier-service/foncier.service';
import { Foncier } from './../../../models/Foncier';
import { AppState } from './../../../store/app.state';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { setLoadingAction } from 'src/app/store/shared/shared.action';
import { map, mergeMap , catchError } from 'rxjs/operators';
import { getFoncierSuccessAction, getFoncierAction, getPropWithLieuxSuccessAction, getPropWithLieuxAction , setFonciersrrorAction } from './foncier.actions';
import { throwError } from 'rxjs';

@Injectable()
export class FoncierEffects {

    userMatricule: any = localStorage.getItem('matricule')

    constructor(
        private actions$: Actions,
        private foncierService: FoncierService,
        private store: Store<AppState>
    ) { }

    // Create effect for fonciers
    loadFonciers$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(getFoncierAction),
            mergeMap(() => this.loadFonciers())
        )
    });

    // Create effect to get proprietait and lieux ids
    loadPropWithLieux$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(getPropWithLieuxAction),
            mergeMap(() => this.loadPropWithLieux())
        )
    });

   
    ///////////////////////////////////////////////////////////////////

    // Load fonciers from service
    loadFonciers() {
        return this.foncierService.getFonciers(this.userMatricule).pipe(
            map(
                (fonciers: Foncier[]) => {
                    if (fonciers.length !== 0) {
                        this.store.dispatch(setLoadingAction({ status: false }))
                        return getFoncierSuccessAction({ fonciers });
                    } else {
                        throw new Error("Il y'a aucun foncier")
                    }
                }
            ),
            catchError((error: any) => {
                this.store.dispatch(setFonciersrrorAction({ error: error.error.message }))
                return throwError(error.error.message)
            })
        )
    }

    // Load Proprietaie With Lieux IDs
    loadPropWithLieux() {
        return this.foncierService.getPropWithLieux(this.userMatricule).pipe(
            map(
                (propWithLieux: any) => {
                    if (propWithLieux.length !== 0) {
                        this.store.dispatch(setLoadingAction({ status: false }))
                        return getPropWithLieuxSuccessAction({ propWithLieux });
                    } else {
                        throw new Error("Il y'a aucun proprietaire avec Lieux")
                    }
                }
            )
        )
    }

   
}