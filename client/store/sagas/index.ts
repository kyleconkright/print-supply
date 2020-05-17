import { all } from 'redux-saga/effects';

import userSaga from './user.saga';
import productsSaga from './products.saga';

export default function* rootSaga() {
  yield all([
    ...userSaga,
    ...productsSaga,
  ])
}