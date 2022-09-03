import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  "chat-new-user": (user: User) => void;
  "chat-user-request": (username: string) => void;
  "chat-remove-user": (id: string) => void;
}

interface ClientToServerEvents {
  "chat-connect": (username: string) => void;
  "chat-ask-user": (id: string) => void;
  "chat-fetch-users": (callback: (users: User[]) => void) => void;
  "chat-accept-request": () => void;
  "chat-reject-request": () => void;
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
    incomingRequest: false as boolean,
    requestUsername: null as string | null,
  }),
  actions: {
    connectToChat(username: string): void {
      this.socket.emit("chat-connect", username);
    },
    listenUsersUpdate(): void {
      this.socket.on("chat-new-user", (user) => {
        const userExists = this.users.find((u) => u.id === user.id);
        if (!userExists) this.users.push(user);
      });

      this.socket.on("chat-remove-user", (id) => {
        this.users = this.users.filter((u) => u.id !== id);
      });
    },
    getUsers(): void {
      this.socket.emit("chat-fetch-users", (response) => {
        this.users = response;
      });
    },
    askToChat(id: string): void {
      this.socket.emit("chat-ask-user", id);
    },
    listenToChatRequests(): void {
      this.socket.on("chat-user-request", (username: string) => {
        this.incomingRequest = true;
        this.requestUsername = username;
      });
    },
    acceptRequest(): void {
      // TODO not implemented
      this.socket.emit("chat-accept-request");
    },
    rejectRequest(): void {
      // TODO not implemented
      console.log("todo");
    },
  },
});
