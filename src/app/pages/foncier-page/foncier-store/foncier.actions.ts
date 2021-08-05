import { Foncier } from './../../../models/Foncier';
import { createAction, props } from '@ngrx/store';

const GET_FONCIERS = '[Foncier Page] Get Lieux'
const GET_FONCIERS_SUCCESS = '[Foncier Page] Get Lieux Success'

const GET_PROPRIETAIR_LIEUX = '[Foncier Page] Proprietaire With Lieux'
const GET_PROPRIETAIR_LIEUX_SUCCESS = '[Foncier Page] Proprietaire With Lieux Success'

// Foncier actions
export const getFoncierAction = createAction(GET_FONCIERS)
export const getFoncierSuccessAction = createAction(GET_FONCIERS_SUCCESS,
    props<{ fonciers: Foncier[] }>())

// Get Proprietaire With Lieux Ids
export const getPropWithLieuxAction = createAction(GET_PROPRIETAIR_LIEUX)
export const getPropWithLieuxSuccessAction = createAction(GET_PROPRIETAIR_LIEUX_SUCCESS,
    props<{ propWithLieux: any }>())
