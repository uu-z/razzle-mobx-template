import React from "react";
import "mobx-react/batchingForReactDom";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "antd/dist/antd.css";
import "./static/css/tailwind.css";

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
