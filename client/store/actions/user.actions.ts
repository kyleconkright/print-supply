export const USER_LOGIN = '[USER] Login';
export const USER_LOGIN_SUCCESS = '[USER] Login Success';

export function userLogin(user) {
  return { type: USER_LOGIN, user }
}

export function userLoginSuccess(user) {
  return { type: USER_LOGIN_SUCCESS, user }
}