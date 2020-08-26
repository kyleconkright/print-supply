import { USER_LOGIN, USER_LOGIN_SUCCESS, SET_USER, CHECK_FOR_LOGGED_IN_USER, USER_LOGOUT_SUCCESS, USER_UPDATE } from "../actions/user.actions";
import { UserState } from "../../models/user";

export const DefaultUserState: UserState = {
  email: null,
}

function reducer(state = DefaultUserState, action: any) {
  const { user } = action;
  switch (action.type) {
    case CHECK_FOR_LOGGED_IN_USER:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOGIN:
      return {
        ...state,
        emailVerified: false,
        emailSent: true,
      };
    case SET_USER:
      return {
        ...state,
        ...user,
        isLoading: false,
      };
    case USER_UPDATE:
      return {
        ...state,
        ...user,
        isLoading: false,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...user,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default reducer;