import { FoncierState } from './foncier.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// Call fonciers state
export const getFonciersState = createFeatureSelector<FoncierState>('foncier');

// Create selector for foncier
export const getFonciers = createSelector(getFonciersState, (state) => {
  return state.fonciers;
});

// Create selector to get proprietaires ids
export const getProprietaires = createSelector(getFonciersState, (state) => {
  return state.propWithLieux.proprietaire;
});

// Create selector to get lieux ids
export const getLieux = createSelector(getFonciersState, (state) => {
  return state.propWithLieux.lieu;
});

