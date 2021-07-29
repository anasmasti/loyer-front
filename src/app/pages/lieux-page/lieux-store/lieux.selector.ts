import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LieuxState } from "./lieux.state";


// Call Lieux state
export const getLieuxState = createFeatureSelector<LieuxState>('lieux')

// Create selector for Lieux
export const getLieux = createSelector(getLieuxState,
   (state) => {
    return state.lieux;
 })


export const getCodeDr = createSelector(getLieuxState , (state: any) => {

    const codeDr = state.lieux

     console.log("This is code dr ===> ",codeDr)
    return codeDr;
   
});