import { createReducer, on } from "@ngrx/store";
import { getLieuxAction, getLieuxSuccessAction } from "./lieux.actions";
import { initialState } from "./lieux.state";


const _lieuxReducer = createReducer(initialState,
    // Get lieux reducers
    on(getLieuxAction, (state) => {
      return {
        ...state,
        lieux: state.lieux
      }
    }),

    // Get lieux on getting success
    on(getLieuxSuccessAction, (state, action) => {
      return {
        ...state,
        lieux: action.lieux,
      }
    }),
  );


export function lieuxReducer(state: any, actions: any) {
    return _lieuxReducer(state, actions)
  }