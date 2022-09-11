import { io, Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "./types";

// TODO move url to .env
const serverUrl = "http://localhost:5000";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(serverUrl, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
