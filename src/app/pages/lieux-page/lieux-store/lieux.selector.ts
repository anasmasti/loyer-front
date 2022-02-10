import { Lieu } from 'src/app/models/Lieu';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LieuxState } from './lieux.state';

// Call Lieux state
export const getLieuxState = createFeatureSelector<LieuxState>('lieux');

// Create selector for Lieux
export const getLieux = createSelector(getLieuxState, (state) => {
  return state.lieux;
});

// Select lieux by type
export const getLieuxByType = createSelector(
  getLieux,
  (getLieux: Lieu[], props: any) => {
    const lieuByType = getLieux.filter(
      (lieu) => lieu.type_lieu == props.type_lieu
    );
    return lieuByType;
  }
);

// Get DR from Lieux data
export const getDr = createSelector(getLieuxState, (state: any) => {
  return state.DrWithSup.DR;
});

// Get Sup from Lieux data
export const getSup = createSelector(getLieuxState, (state: any) => {
  return state.DrWithSup.SUP;
});

// Get error
export const getError = createSelector(getLieuxState, (state: any) => {
  return state.error;
});
