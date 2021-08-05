import { Foncier } from './../../../models/Foncier';
import { createAction, props } from '@ngrx/store';

const GET_FONCIERS = '[Foncier Page] Get Lieux'
const GET_FONCIERS_SUCCESS = '[Foncier Page] Get Lieux Success'

const GET_PROPRIETAIR_LIEUX_IDS = '[Foncier Page] Proprietaire With Lieux Ids'
const GET_PROPRIETAIR_LIEUX_IDS_SUCCESS = '[Foncier Page] Proprietaire With Lieux Ids Success'

// Foncier actions
export const getFoncierAction = createAction(GET_FONCIERS)
export const getFoncierSuccessAction = createAction(GET_FONCIERS_SUCCESS,
    props<{ fonciers: Foncier[] }>())

// Get Proprietaire With Lieux Ids
export const getProprietaireWithLieuxIdsAction = createAction(GET_PROPRIETAIR_LIEUX_IDS)
export const getProprietaireWithLieuxIdsSuccessAction = createAction(GET_PROPRIETAIR_LIEUX_IDS_SUCCESS,
    props<{ proprietaireWithLieuxIds: any }>())
