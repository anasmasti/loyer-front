import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LieuxState } from "./lieux.state";


// Call Lieux state
export const getLieuxState = createFeatureSelector<LieuxState>('lieux')

// Create selector for Lieux
export const getLieux = createSelector(getLieuxState,
   (state) => {
    return state.lieux;
 })