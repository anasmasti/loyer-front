import { createReducer, on } from "@ngrx/store";
import { getFoncierAction, getFoncierSuccessAction } from "./foncier.actions";
import { initialState } from "./foncier.state";


const _foncierReducer = createReducer(initialState,
  // Get foncier reducers
  on(getFoncierAction, (state) => {
    return {
      ...state,
      fonciers: state.fonciers
    }
  }),

  // Get foncier on getting success
  on(getFoncierSuccessAction, (state, action) => {
    return {
      ...state,
      fonciers: action.fonciers,
    }
  }),

);


export function foncierReducer(state: any, actions: any) {
  return _foncierReducer(state, actions)
}