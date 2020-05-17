import axios from 'axios';

import { takeLatest, call, put } from 'redux-saga/effects';
import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGOUT, SET_USER, CHECK_FOR_LOGGED_IN_USER, USER_LOGOUT_SUCCESS } from '../actions/user.actions';
import { formatUserFromApi } from '../../models/user';
import { DefaultAppState } from '../reducers';
import { DefaultUserState } from '../reducers/user.reducer';

function* checkForLoggedInUser() {
  try {
    const user = yield call(isUserSignedIn);
    yield put({ type: SET_USER, user });
  } catch (err) { console.error(err) }
}

async function isUserSignedIn() {
  const email = window.localStorage.getItem('print-supply-email');
  if (!email) return null;
  let user;
  if (window.location.href.indexOf('signIn') !== -1 && !!email) {
    try {
      user = (await axios.post('http://localhost:5001/complete', { url: window.location.href, email })).data.user.user;
      return user;
    } catch (err) { console.error(err); }
  } else {
    try {
      user = (await axios.get('http://localhost:5001/'))
      return user.data.response ? formatUserFromApi(user.data.response) : null;
    } catch (err) { console.error(err); }
  }
}

function* userLogin(action) {
  const { email } = action.user;
  try {
    yield call(loginToApp, email);
    yield put({ type: USER_LOGIN_SUCCESS, email })
  } catch (err) {
    console.log(err);
  }
}

async function loginToApp(email) {
  await axios.post('http://localhost:5001/login', { email }).then(() => {
    window.localStorage.setItem('print-supply-email', email);
  }).catch(err => console.error(err));
}

function* userLogout() {
  try {
    yield call(() => axios.post('http://localhost:5001/logout'));
    yield put({ type: USER_LOGOUT_SUCCESS, user: DefaultUserState})
  } catch (err) {
    console.log(err);
  }
}

const userSaga = [
  takeLatest(
    CHECK_FOR_LOGGED_IN_USER,
    checkForLoggedInUser
  ),
  takeLatest(
    USER_LOGIN,
    userLogin
  ),
  takeLatest(
    USER_LOGOUT,
    userLogout
  ),
  // takeLatest(
  //   USER_LOGIN_SUCCESS,
  //   setUser
  // ),
]

export default userSaga;