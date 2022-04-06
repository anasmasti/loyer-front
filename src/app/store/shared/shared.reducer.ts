
import { createReducer, on } from "@ngrx/store";
import { fillUserTypeAction, getAllCountsAction, getAllCountsSuccessAction, getCitiesAction, getCitiesSuccessAction, getUserTypeAction, setLoadingAction } from "./shared.action";
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

    // Get all counts
    on(getCitiesAction, (state) => {
        return {
            ...state,
            cities: state.cities
        }
    }),

    // On all counts come from server
    on(getCitiesSuccessAction, (state, action) => {
        return {
            ...state,
            cities: action.cities,
        }
    }),

    on(fillUserTypeAction, (state, action) => {
        return {
            ...state,
            userType: action.user_type
        }
    }),

     // On all counts come from server
     on(getUserTypeAction, (state) => {
        return {
            ...state,
            userType: state.userType
        }
    }),
)

export function sharedReducer(state: any, action: any) {
    return _sharedReducer(state, action)
}