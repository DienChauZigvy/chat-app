import { createContext } from "react";
import { Socket, io } from "socket.io-client";

const accessToken = localStorage.getItem("access_token");

export const socket = io("http://localhost:3000", {
  extraHeaders: {
    authorization: `Bearer ${accessToken}`,
  },
});

export const WebsocketContext = createContext<Socket>(socket);

export const WebsocketProvider = WebsocketContext.Provider;
