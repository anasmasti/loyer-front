export interface SharedState {
    loading: boolean,
    allCounts: any
}

export const initialState: SharedState = {
    loading: true,
    allCounts: []
}