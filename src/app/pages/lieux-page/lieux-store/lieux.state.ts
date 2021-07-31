import { Lieu } from 'src/app/models/Lieu';

export interface LieuxState {
    lieux: Lieu[]
}

export const initialState: LieuxState = {
    lieux: [],
}