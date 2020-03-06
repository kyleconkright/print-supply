import axios from 'axios';

import { takeLatest, call, put } from 'redux-saga/effects';
import { USER_LOGIN, USER_LOGIN_SUCCESS, SET_USER, CHECK_FOR_LOGGED_IN_USER } from '../actions/user.actions';
import { formatUserFromApi } from '../../models/user';

function* checkForLoggedInUser() {
  try {
    const user = yield isUserSignedIn();
    if (user) yield put({ type: SET_USER, user })
  } catch(err) { console.error(err) }
}

function isUserSignedIn() {
  return new Promise((resolve, reject) => {
    let user = null;
    console.log(window.location.href.indexOf('signIn') !== -1, window.localStorage.getItem('print-supply-email'))
    const email = window.localStorage.getItem('print-supply-email');
    if (window.location.href.indexOf('signIn') !== -1 && window.localStorage.getItem('print-supply-email')) {
      try {
        user = axios.post('http://localhost:5001/complete', { url: window.location.href, email })
      } catch (err) { reject(err) }
    } 
    if (email) {
      try {
        user = axios.get('http://localhost:5001/').then(res => formatUserFromApi(res.data.response));
      } catch (err) { reject(err) }
    }
    resolve(user);
  })
}

function* userLogin(action) {
  try {
    const { email } = action.user;
    const user = action.user;
    yield call(loginToApp, email);
    console.log(user);
    yield put({ type: USER_LOGIN_SUCCESS, email })
  } catch(err) {
    console.log(err);
  }
}

async function loginToApp(email) {
  try {
    await axios.post('http://localhost:5001/login', {email});
    window.localStorage.setItem('print-supply-email', email);
  } catch(err) {
    console.log(err);
  }
}

async function* setUser(user) {
  try {
    await axios.post('http://localhost:5001/login', {user});
    window.localStorage.setItem('print-supply-email', user);
  } catch(err) {
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
    USER_LOGIN_SUCCESS,
    setUser
  ),
]

export default userSaga;