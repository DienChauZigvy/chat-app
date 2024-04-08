import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { WebsocketProvider, socket } from "./contexts/WebsocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WebsocketProvider value={socket}>
        <App />
      </WebsocketProvider>
    </BrowserRouter>
  </React.StrictMode>
);
