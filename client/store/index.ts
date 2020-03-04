import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { DefaultAppState } from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware()

const initStore = (preloadedState = DefaultAppState)=> {

  const store: any = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  store.runSagaTask();
  return store
}

export default initStore;
