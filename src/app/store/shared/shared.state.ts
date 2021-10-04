export interface SharedState {
    loading: boolean,
    allCounts: any,
    cities: any
}

export const initialState: SharedState = {
    loading: true,
    allCounts: [],
    cities: []
}