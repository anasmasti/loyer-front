import { FoncierService } from './../../../services/foncier-service/foncier.service';
import { Foncier } from './../../../models/Foncier';
import { AppState } from './../../../store/app.state';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { setLoadingAction } from 'src/app/store/shared/shared.action';
import { map, mergeMap } from 'rxjs/operators';
import { getFoncierSuccessAction, getFoncierAction, getProprietaireWithLieuxIdsSuccessAction, getProprietaireWithLieuxIdsAction } from './foncier.actions';

@Injectable()
export class FoncierEffects {

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
    loadProprietaireWithLieuxIds$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(getProprietaireWithLieuxIdsAction),
            mergeMap(() => this.loadProprietaireWithLieuxIds())
        )
    });

    ///////////////////////////////////////////////////////////////////

    // Load fonciers from service
    loadFonciers() {
        return this.foncierService.getFonciers().pipe(
            map(
                (fonciers: Foncier[]) => {
                    this.store.dispatch(setLoadingAction({ status: false }))
                    return getFoncierSuccessAction({ fonciers });
                }
            )
        )
    }

    // Load Proprietaie With Lieux IDs
    loadProprietaireWithLieuxIds() {
        return this.foncierService.getProprietaieWithLieuxIDs().pipe(
            map(
                (proprietaireWithLieuxIds: any) => {
                    this.store.dispatch(setLoadingAction({ status: false }))
                    return getProprietaireWithLieuxIdsSuccessAction({ proprietaireWithLieuxIds });
                }
            )
        )
    }
}