import { Lieu } from 'src/app/models/Lieu';

export interface LieuxState {
    lieux: Lieu[]
    DrWithSup: []
    error: string
}

export const initialState: LieuxState = {
    lieux: [],
    DrWithSup: [],
    error: ''
}