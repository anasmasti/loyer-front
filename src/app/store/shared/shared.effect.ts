import { AppState } from './../app.state';
import { getAllCountsSuccessAction, getCountriesAction, getCountriesSuccessAction } from './shared.action';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { getAllCountsAction, setLoadingAction } from 'src/app/store/shared/shared.action';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class SharedEffects {

    constructor(
        private actions$: Actions,
        private helperervice: HelperService,
        private store: Store<AppState>
    ) { }

    // Create effect for all counts
    loadAllCounts$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(getAllCountsAction),
            mergeMap(() => this.loadAllCounts())
        )
    });

    // Create effect for all coutries
    loadCoutries$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(getCountriesAction),
            mergeMap(() => this.loadCountries())
        )
    });

    ///////////////////////////////////////////////////////////////////

    // Load all counts from service
    loadAllCounts() {
        return this.helperervice.getAllCounts().pipe(
            map(
                (all_counts: any) => {
                    if (all_counts.length !== 0) {
                        this.store.dispatch(setLoadingAction({ status: false }))
                        return getAllCountsSuccessAction({ all_counts });
                    } else {
                        throw new Error("Il y'a aucun Lieu")
                    }
                }
            )
        )
    }

    // Load countries from service
    loadCountries() {
        return this.helperervice.getCountries().pipe(
            map(
                (countries: any) => {
                    if (countries.length !== 0) {
                        this.store.dispatch(setLoadingAction({ status: false }))
                        return getCountriesSuccessAction({ countries });
                    } else {
                        throw new Error("Il y'a aucun pays")
                    }
                }
            )
        )
    }

}