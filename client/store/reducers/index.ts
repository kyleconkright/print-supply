import { combineReducers } from 'redux'
import user, { UserState, DefaultUserState } from './user.reducer';

export interface AppState {
  user: UserState,
}

export const DefaultAppState: AppState = {
  user: DefaultUserState,
}


export default combineReducers({
  user,
})