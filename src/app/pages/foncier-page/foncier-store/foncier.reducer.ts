import { createReducer, on } from "@ngrx/store";
import { getFoncierAction, getFoncierSuccessAction, getProprietaireWithLieuxIdsAction, getProprietaireWithLieuxIdsSuccessAction } from "./foncier.actions";
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
  on(getProprietaireWithLieuxIdsAction, (state) => {
    return {
      ...state,
      proprietaireWithLieuxIds: state.proprietaireWithLieuxIds
    }
  }),

  // Get Proprietaie With Lieux IDs success
  on(getProprietaireWithLieuxIdsSuccessAction, (state, action) => {
    return {
      ...state,
      proprietaireWithLieuxIds: action.proprietaireWithLieuxIds,
    }
  }),

);


export function foncierReducer(state: any, actions: any) {
  return _foncierReducer(state, actions)
}