import { Lieu } from 'src/app/models/Lieu';

export interface LieuxState {
    lieux: Lieu[]
    DrWithSup: []
}

export const initialState: LieuxState = {
    lieux: [],
    DrWithSup: []
}