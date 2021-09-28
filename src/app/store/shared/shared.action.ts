import { createAction, props } from '@ngrx/store';

const SET_LOADING = '[Shared Store] set loading';
const GET_ALL_COUNTS = '[Shared Store] Get All Counts';
const GET_ALL_COUNTS_SUCCESS = '[Shared Store] Get All Counts Success';

const GET_COUNTRIES = '[Shared Store] Get Countries';
const GET_COUNTRIES_SUCCESS = '[Shared Store] Get Countries Success';

const GET_FONCIER_ID = '[Shared Store] Get Foncier ID';


export const setLoadingAction = createAction(SET_LOADING,
  props<{ status: boolean }>())

export const getAllCountsAction = createAction(GET_ALL_COUNTS)
export const getAllCountsSuccessAction = createAction(GET_ALL_COUNTS_SUCCESS,
  props<{ all_counts: any }>())

export const getCountriesAction = createAction(GET_COUNTRIES);
export const getCountriesSuccessAction = createAction(
  GET_COUNTRIES_SUCCESS,
  props<{ countries: any }>()
);