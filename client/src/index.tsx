import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/styles.scss";
import App from "./components/app/App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
// ]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
