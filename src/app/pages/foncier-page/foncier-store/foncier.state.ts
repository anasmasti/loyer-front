import { Foncier } from './../../../models/Foncier';

export interface FoncierState {
    fonciers: Foncier[],
    proprietaireWithLieuxIds: any
}

export const initialState: FoncierState = {
    fonciers: [],
    proprietaireWithLieuxIds: []
}