import { createAction, props } from '@ngrx/store';

const SET_LOADING = '[Shared Store] set loading';
const GET_ALL_COUNTS = '[Shared Store] Get All Counts';
const GET_ALL_COUNTS_SUCCESS = '[Shared Store] Get All Counts Success';




export const setLoadingAction = createAction(
  SET_LOADING,
  props<{ status: boolean }>()
);

export const getAllCountsAction = createAction(GET_ALL_COUNTS);
export const getAllCountsSuccessAction = createAction(GET_ALL_COUNTS_SUCCESS,props<{ all_counts: any }>());

