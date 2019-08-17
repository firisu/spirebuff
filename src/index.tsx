import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import reducer from "./rootReducer";

// styles
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import "./styles/index.css";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
