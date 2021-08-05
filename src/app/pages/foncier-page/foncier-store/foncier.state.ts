import { Foncier } from './../../../models/Foncier';

export interface FoncierState {
    fonciers: Foncier[]
}

export const initialState: FoncierState = {
    fonciers: [],
}