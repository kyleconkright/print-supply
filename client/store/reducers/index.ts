import { combineReducers } from 'redux'
import user, { DefaultUserState } from './user.reducer';
import { UserState } from '../../models/user';

export interface AppState {
  user: UserState,
}

export const DefaultAppState: AppState = {
  user: null,
}


export default combineReducers({
  user,
})