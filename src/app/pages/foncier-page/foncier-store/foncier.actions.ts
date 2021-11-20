import { Foncier } from './../../../models/Foncier';
import { createAction, props } from '@ngrx/store';

const GET_FONCIERS = '[Foncier Page] Get Lieux'
const GET_FONCIERS_SUCCESS = '[Foncier Page] Get Lieux Success'

const GET_PROPRIETAIR_LIEUX = '[Foncier Page] Proprietaire With Lieux'
const GET_PROPRIETAIR_LIEUX_SUCCESS = '[Foncier Page] Proprietaire With Lieux Success'

const GET_ERROR_FONCIERS = '[Lieux Page] Get Error'


// Foncier actions
export const getFoncierAction = createAction(GET_FONCIERS)
export const getFoncierSuccessAction = createAction(GET_FONCIERS_SUCCESS,
    props<{ fonciers: Foncier[] }>())

export const setFonciersrrorAction = createAction(GET_ERROR_FONCIERS, props<{ error: string }>())