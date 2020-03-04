import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import rootReducer, { DefaultAppState } from './../store/reducers';
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../store/sagas";

const sagaMiddleware = createSagaMiddleware();

const store: any = createStore(
  rootReducer,
  DefaultAppState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

store.runSagaTask = () => {
  store.sagaTask = sagaMiddleware.run(rootSaga)
}
store.runSagaTask()


function PrintSupplyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default PrintSupplyApp