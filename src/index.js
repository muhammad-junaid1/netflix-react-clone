import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Import external components or files
import App from "./App";
import "./assets/index.css";

// Render to the div with id "root"
ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
);
