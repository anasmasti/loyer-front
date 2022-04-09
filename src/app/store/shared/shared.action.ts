import { createAction, props } from '@ngrx/store';

const SET_LOADING = '[Shared Store] set loading';
const GET_ALL_COUNTS = '[Shared Store] Get All Counts';
const GET_ALL_COUNTS_SUCCESS = '[Shared Store] Get All Counts Success';

const GET_CITIES = '[Shared Store] Get Cities';
const GET_CITIES_SUCCESS = '[Shared Store] Get Cities Success';

const FILL_USER_TYPE = '[Shared Store] Fill User Type';
const GET_USER_TYPE = '[Shared Store] Get User Type';

export const setLoadingAction = createAction(
  SET_LOADING,
  props<{ status: boolean }>()
);

export const getAllCountsAction = createAction(GET_ALL_COUNTS);
export const getAllCountsSuccessAction = createAction(
  GET_ALL_COUNTS_SUCCESS,
  props<{ all_counts: any }>()
);

export const getCitiesAction = createAction(GET_CITIES);
export const getCitiesSuccessAction = createAction(
  GET_CITIES_SUCCESS,
  props<{ cities: any }>()
);

export const fillUserTypeAction = createAction(
  FILL_USER_TYPE,
  props<{ user_type: string[] }>()
);

export const getUserTypeAction = createAction(GET_USER_TYPE);
