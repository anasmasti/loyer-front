import { sharedReducer } from "./shared/shared.reducer";
import { SharedState } from "./shared/shared.state";
import { Lieu } from "../models/Lieu";

export interface AppState {
    shared: SharedState;
}
export const appReducer = {
    shared: sharedReducer
}

