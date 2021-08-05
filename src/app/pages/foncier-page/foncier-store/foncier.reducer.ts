import { createReducer, on } from "@ngrx/store";
import { getFoncierAction, getFoncierSuccessAction, getPropWithLieuxAction, getPropWithLieuxSuccessAction } from "./foncier.actions";
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

  // Get Proprietaie With Lieux IDs
  on(getPropWithLieuxAction, (state) => {
    return {
      ...state,
      propWithLieux: state.propWithLieux
    }
  }),

  // Get Proprietaie With Lieux IDs success
  on(getPropWithLieuxSuccessAction, (state, action) => {
    return {
      ...state,
      propWithLieux: action.propWithLieux,
    }
  }),

);


export function foncierReducer(state: any, actions: any) {
  return _foncierReducer(state, actions)
}