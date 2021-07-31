import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";
import { LieuxState } from "src/app/pages/lieux-page/lieux-store/lieux.state";

export const getSharedState = createFeatureSelector<SharedState>('shared')

export const getLoading = createSelector(getSharedState, (state) => {
    return state.loading
})

