import { createAction, props } from '@ngrx/store';
import { Lieu } from 'src/app/models/Lieu';

const GET_LIEUX = '[Lieux Page] Get Lieux'
const GET_LIEUX_SUCCESS = '[Lieux Page] Get Lieux Success'

// Lieux actions
export const getLieuxAction = createAction(GET_LIEUX)
export const getLieuxSuccessAction = createAction(GET_LIEUX_SUCCESS,
    props<{ lieux: Lieu[] }>())