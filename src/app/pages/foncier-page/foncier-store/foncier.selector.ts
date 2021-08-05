import { FoncierState } from './foncier.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// Call fonciers state
export const getFonciersState = createFeatureSelector<FoncierState>('foncier');

// Create selector for foncier
export const getFonciers = createSelector(getFonciersState, (state) => {
  return state.fonciers;
});

