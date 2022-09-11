import type { User } from "@/types";
import { defineStore } from "pinia";

export const useChatStore = defineStore({
  id: "chat",
  state: () => ({
    users: [] as User[],
    connected: false as boolean,
    userId: null as string | null,
  }),
});
