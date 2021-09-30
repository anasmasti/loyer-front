import { Foncier } from './../../../models/Foncier';

export interface FoncierState {
    fonciers: Foncier[],
    propWithLieux: any,
    error: string
}

export const initialState: FoncierState = {
    fonciers: [],
    propWithLieux: [],
    error: ''
}