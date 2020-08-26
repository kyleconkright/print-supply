import { Provider } from "react-redux";
import UserContextProvider from './../components/contexts/auth-context';
import store from './../store';

function PrintSupplyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </Provider>
  )
}

export default PrintSupplyApp