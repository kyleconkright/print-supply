import * as actions from "../actions/user.actions";
import { USER_LOGIN, USER_LOGIN_SUCCESS } from "../actions/user.actions";

export interface UserState {
  email: string;
}

export const DefaultUserState: UserState = {
  email: '',
}

function reducer(user = DefaultUserState, action: any) {

  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...user,
        ...action.user
      };
    default:
      return user;
  }
}

export default reducer;