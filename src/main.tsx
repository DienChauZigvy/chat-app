import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { WebsocketProvider, socket } from "./contexts/WebsocketContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <WebsocketProvider value={socket}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </WebsocketProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
