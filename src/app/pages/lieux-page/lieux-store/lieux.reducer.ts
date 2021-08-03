import { createReducer, on } from "@ngrx/store";
import { getDrWithSupAction, getDrWithSupSuccessAction, getLieuxAction, getLieuxSuccessAction } from "./lieux.actions";
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

  ////////////////////////////////////////

  // Get Dr with Sup reducers
  on(getDrWithSupAction, (state) => {
    return {
      ...state,
      DrWithSup: state.DrWithSup
    }
  }),

  // Get Dr with Sup on getting success
  on(getDrWithSupSuccessAction, (state, action) => {
    return {
      ...state,
      DrWithSup: action.DrWithSup,
    }
  }),
);


export function lieuxReducer(state: any, actions: any) {
  return _lieuxReducer(state, actions)
}