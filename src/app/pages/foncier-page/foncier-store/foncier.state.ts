import { Foncier } from './../../../models/Foncier';

export interface FoncierState {
    fonciers: Foncier[],
    propWithLieux: any
}

export const initialState: FoncierState = {
    fonciers: [],
    propWithLieux: []
}