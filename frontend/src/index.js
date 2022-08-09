import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { FlightContextProvider } from "./FlightContext";

ReactDOM.render(
  <React.StrictMode>
    <FlightContextProvider>
      <App />
    </FlightContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
