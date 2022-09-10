import type { User } from "@/types";
import { defineStore } from "pinia";

export const useChatStore = defineStore({
  id: "user",
  state: () => ({
    users: [] as User[],
    connected: false as boolean,
  }),
});