
import { createReducer, on } from "@ngrx/store";
import { getAllCountsAction, getAllCountsSuccessAction, setLoadingAction } from "./shared.action";
import { initialState } from "./shared.state";

const _sharedReducer = createReducer(initialState,
    // Put true on loading state
    on(setLoadingAction, (state, action) => {
        return {
            ...state,
            loading: action.status
        }
    }),

    // Get all counts
    on(getAllCountsAction, (state) => {
        return {
            ...state,
            allCounts: state.allCounts
        }
    }),

    // On all counts come from server
    on(getAllCountsSuccessAction, (state, action) => {
        return {
            ...state,
            allCounts: action.all_counts,
        }
    }),
)

export function sharedReducer(state: any, action: any) {
    return _sharedReducer(state, action)
}