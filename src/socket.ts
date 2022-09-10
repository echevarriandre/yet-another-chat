import { io, Socket } from "socket.io-client";
import { useChatStore } from "./stores/chat";
import { SC, type ClientToServerEvents, type ServerToClientEvents, type User } from "./types";

// INFO Tutorial https://socket.io/get-started/private-messaging-part-2/
const serverUrl = "http://localhost:5000";

const socket = io(serverUrl, { autoConnect: false }) as Socket<ServerToClientEvents, ClientToServerEvents>;

socket.onAny((event, ...args) => {
  console.log(event, args);
});

const chatStore = useChatStore();
socket.on("connect", () => {
  chatStore.connected = true;
});

socket.on("disconnect", () => {
  chatStore.connected = false;
});

const { users } = useChatStore();
socket.on(SC.Users, (activeUsers: User[]) => {
  activeUsers.forEach((u) => {
    u.messages = [];
  });
  users.push(...activeUsers);
  socket.off(SC.Users);
});

export default socket;
