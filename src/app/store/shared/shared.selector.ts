import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";

export const getSharedState = createFeatureSelector<SharedState>('shared')

export const getLoading = createSelector(getSharedState, (state) => {
    return state.loading
})

export const getAllCounts = createSelector(getSharedState, (state) => {
    return state.allCounts
})

export const getCities = createSelector(getSharedState, (state) => {
    return state.cities
})

export const getUserType = createSelector(getSharedState, (state) => {
    return state.userType
})