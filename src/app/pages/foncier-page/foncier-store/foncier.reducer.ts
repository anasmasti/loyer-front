import { createReducer, on } from "@ngrx/store";
import { getFoncierAction, getFoncierSuccessAction, setFonciersrrorAction } from "./foncier.actions";
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

  /////////////////////////////////////////////

  on(setFonciersrrorAction, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),

);


export function foncierReducer(state: any, actions: any) {
  return _foncierReducer(state, actions)
}