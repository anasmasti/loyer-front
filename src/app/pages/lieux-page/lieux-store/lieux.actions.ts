import { createAction, props } from '@ngrx/store';
import { Lieu } from 'src/app/models/Lieu';

const GET_LIEUX = '[Lieux Page] Get Lieux'
const GET_LIEUX_SUCCESS = '[Lieux Page] Get Lieux Success'

const GET_DR_SUP = '[Lieux Page] Get DR_SUP'
const GET_DR_SUP_SUCCESS = '[Lieux Page] Get DR_SUP Success'

const GET_ERROR_LIEUX = '[Lieux Page] Get Error'

// Lieux actions
export const getLieuxAction = createAction(GET_LIEUX)
export const getLieuxSuccessAction = createAction(GET_LIEUX_SUCCESS,
    props<{ lieux: Lieu[] }>())

// Lieux Dr with Sup
export const getDrWithSupAction = createAction(GET_DR_SUP)
export const getDrWithSupSuccessAction = createAction(GET_DR_SUP_SUCCESS,
    props<{ DrWithSup: [] }>())

export const setLieuxErrorAction = createAction(GET_ERROR_LIEUX, props<{ error: string }>())