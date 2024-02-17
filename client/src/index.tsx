import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/styles.scss";
import App from "./components/app/App";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./service";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store()}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
