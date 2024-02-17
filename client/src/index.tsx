import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Router } from "react-router-dom";
import history from "./utilits/history";
import "./assets/scss/styles.scss";
import "./index.ts";
import App from "./components/app/app";
import store from "./services/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store()}>
      <BrowserRouter basename="/">
        {/* <Router history={history}> */}
        <App />
        {/* </Router> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
