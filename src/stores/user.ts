import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: sessionStorage.getItem("username") as string | null,
  }),
  actions: {
    login(username: string): void {
      this.username = username;
      sessionStorage.setItem("username", username);
    },
    logout(): void {
      this.username = null;
      sessionStorage.removeItem("username");
    },
  },
});
