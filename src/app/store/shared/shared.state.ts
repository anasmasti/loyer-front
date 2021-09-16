export interface SharedState {
    loading: boolean,
    allCounts: any,
    countries: any
}

export const initialState: SharedState = {
    loading: true,
    allCounts: [],
    countries: []
}