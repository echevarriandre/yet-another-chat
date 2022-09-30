import socket from "@/socket";
import type { User } from "@/types";
import { defineStore } from "pinia";

export const useChatStore = defineStore({
  id: "chat",
  state: () => ({
    users: [] as User[],
    connected: false as boolean,
    userId: null as string | null,
    username: null as string | null,
  }),
  actions: {
    logout() {
      this.username = null;
      this.userId = null;
      this.connected = false;
      socket.disconnect();
      sessionStorage.removeItem("sessionId");
    },
  },
});
