import * as actions from "../actions/user.actions";
import { USER_LOGIN, USER_LOGIN_SUCCESS, SET_USER, CHECK_FOR_LOGGED_IN_USER } from "../actions/user.actions";
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
    case SET_USER:
      return {
        ...state,
        ...user,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default reducer;