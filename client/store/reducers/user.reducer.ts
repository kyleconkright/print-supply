import * as actions from "../actions/user.actions";
import { USER_LOGIN, USER_LOGIN_SUCCESS, SET_USER } from "../actions/user.actions";
import { UserState } from "../../models/user";

export const DefaultUserState: UserState = {
  email: '',
  uid: '',
  displayName: '',
  lastLoginAt: '',
  createdAt: '',
}

function reducer(user = DefaultUserState, action: any) {
  switch (action.type) {
    case SET_USER:
      return {
        ...user,
        ...action.user
      };
    default:
      return user;
  }
}

export default reducer;