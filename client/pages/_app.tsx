import { Provider } from "react-redux";
import store from './../store';

function PrintSupplyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default PrintSupplyApp