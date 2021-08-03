import { User } from 'src/app/models/User';

export interface UsersState {
    users: User[]
}

export const initialState: UsersState = {
    users: []
}