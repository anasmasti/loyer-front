import { createReducer, on } from "@ngrx/store";
import { getUsersAction, getUsersSuccessAction } from "./admin.actions";
import { initialState } from "./admin.state";

const _usersReducer = createReducer(initialState,
    // Get users reducers
    on(getUsersAction, (state) => {
        return {
            ...state,
            users: state.users
        }
    }),

    // Get users on getting success
    on(getUsersSuccessAction, (state, action) => {
        return {
            ...state,
            users: action.users,
        }
    }),
);


export function usersReducer(state: any, actions: any) {
    return _usersReducer(state, actions)
}