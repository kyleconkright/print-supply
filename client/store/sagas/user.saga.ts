import axios from 'axios';

import { takeLatest, call, put } from 'redux-saga/effects';
import { USER_LOGIN, USER_LOGIN_SUCCESS } from '../actions/user.actions';

function* userLogin(action) {
  try {
    const { email } = action.user;
    const user = yield call(loginToApp, email);
    yield put({ type: USER_LOGIN_SUCCESS, user })
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

const userSaga = [
  takeLatest(
    USER_LOGIN,
    userLogin
  ),
]

export default userSaga;