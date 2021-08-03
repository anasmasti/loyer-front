import { createAction, props } from "@ngrx/store"
import { User } from "src/app/models/User"

const GET_USERS = '[User Page] Get Users'
const GET_USERS_SUCCESS = '[User Page] Get Users Success'


// Users actions
export const getUsersAction = createAction(GET_USERS)
export const getUsersSuccessAction = createAction(GET_USERS_SUCCESS,
    props<{ users: User[] }>())