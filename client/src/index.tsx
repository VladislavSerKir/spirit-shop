import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/styles.scss";
import App from "./components/app/App";
import { Provider } from "react-redux";
import { BrowserRouter, Router } from "react-router-dom";
import history from "./utils/history";
import createStore from "./store";
import "react-toastify/dist/ReactToastify.css";
import "./i18n";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { config } from "./utils/api";

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Router history={history}>
            <App />
          </Router>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
