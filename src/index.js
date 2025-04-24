import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'select2/dist/js/select2.min.js';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { Provider } from 'react-redux';
import store from "./redux/store";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <Toaster />
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </>
);

reportWebVitals();
