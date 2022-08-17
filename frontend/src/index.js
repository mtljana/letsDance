import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";

import { DanceClassProvider } from "./components/DanceClassContext";

ReactDOM.render(
  <DanceClassProvider>
    <Auth0Provider
      domain={process.env.REACT_APP_domain}
      clientId={process.env.REACT_APP_clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </DanceClassProvider>,
  document.getElementById("root")
);

