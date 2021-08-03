import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "./admin.state";

// Call users state
export const getUsersState = createFeatureSelector<UsersState>('users');

// Create selector for users
export const getUsers = createSelector(getUsersState, (state) => {
  return state.users;
});