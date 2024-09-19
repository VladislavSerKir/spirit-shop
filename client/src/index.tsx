import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/styles.scss";
import App from "./components/app/App";
import { Provider } from "react-redux";
import { BrowserRouter, Router } from "react-router-dom";
import history from "./utils/history";
import createStore from "./store";

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Router history={history}>
          <App />
        </Router>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
