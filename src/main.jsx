import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import countrySlice from "./redux/countrySlice.js";
import countrySaga from "./redux/countrySaga.js";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    country: countrySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(countrySaga);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
