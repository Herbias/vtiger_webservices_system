import "../styles/index.css";

import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { createStore } from "redux";
import reducer, { initState } from "../redux/reducer";

const store = () => {
  return createStore(reducer);
};

const MyApp = ({ Component, pageProps, store }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default withRedux(store)(MyApp);
