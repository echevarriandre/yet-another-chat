import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  "chat-new-user": (user: User) => void;
}

interface ClientToServerEvents {
  "chat-connect": (username: string) => void;
  "chat-fetch-users": (callback: (users: User[]) => void) => void;
}

interface User {
  id: string;
  username: string;
}

export const useServerStore = defineStore({
  id: "server",
  state: () => ({
    socket: io("http://localhost:5000") as Socket<ServerToClientEvents, ClientToServerEvents>,
    users: [] as User[],
  }),
  actions: {
    connectToChat(username: string): void {
      this.socket.emit("chat-connect", username);
    },
    listenUsersUpdate(): void {
      this.socket.on("chat-new-user", (user) => {
        this.users.push(user);
        console.log("got users");
      });
    },
    getUsers(): void {
      this.socket.emit("chat-fetch-users", (response) => {
        this.users = response;
      });
    },
  },
});
