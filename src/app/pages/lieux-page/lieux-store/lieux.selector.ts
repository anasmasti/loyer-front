import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LieuxState } from './lieux.state';

// Call Lieux state
export const getLieuxState = createFeatureSelector<LieuxState>('lieux');

// Create selector for Lieux
export const getLieux = createSelector(getLieuxState, (state) => {
  return state.lieux;
});

// Get DR from Lieux data
export const getDr = createSelector(getLieuxState, (state: any) => {
  return state.DrWithSup.DR;
});
  

// Get Sup from Lieux data
export const getSup = createSelector(getLieuxState, (state: any) => {
  return state.DrWithSup.SUP;
});