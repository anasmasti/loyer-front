import { Foncier } from './../../../models/Foncier';
import { createAction, props } from '@ngrx/store';

const GET_FONCIERS = '[Foncier Page] Get Lieux'
const GET_FONCIERS_SUCCESS = '[Foncier Page] Get Lieux Success'


// Foncier actions
export const getFoncierAction = createAction(GET_FONCIERS)
export const getFoncierSuccessAction = createAction(GET_FONCIERS_SUCCESS,
    props<{ fonciers: Foncier[] }>())
