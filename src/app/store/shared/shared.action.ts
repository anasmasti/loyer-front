import { createAction, props } from '@ngrx/store';

const SET_LOADING = '[Shared Store] set loading';
const GET_ALL_COUNTS = '[Shared Store] Get All Counts';
const GET_ALL_COUNTS_SUCCESS = '[Shared Store] Get All Counts Success';

const GET_CITIES = '[Shared Store] Get Cities';
const GET_CITIES_SUCCESS = '[Shared Store] Get Cities Success';


export const setLoadingAction = createAction(SET_LOADING,
  props<{ status: boolean }>())

export const getAllCountsAction = createAction(GET_ALL_COUNTS)
export const getAllCountsSuccessAction = createAction(GET_ALL_COUNTS_SUCCESS,
  props<{ all_counts: any }>())

export const getCitiesAction = createAction(GET_CITIES);
export const getCitiesSuccessAction = createAction(
  GET_CITIES_SUCCESS,
  props<{ cities: any }>()
);