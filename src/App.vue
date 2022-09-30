<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { RouteNames } from "./router/routes";
import socket from "./socket";
import { useChatStore } from "./stores/chat";
import { SC } from "./types";

const sessionId = sessionStorage.getItem("sessionId");
if (sessionId) {
  socket.auth = { sessionId };
  socket.connect();
}

const chatStore = useChatStore();
const router = useRouter();
socket.on(SC.Session, (sessionId, userId) => {
  socket.auth = { sessionId };
  chatStore.userId = userId;
  sessionStorage.setItem("sessionId", sessionId);
  const username = sessionStorage.getItem("username");
  if (username) chatStore.username = username;
  router.push({ name: RouteNames.Chat });
});

socket.on("connect", () => {
  chatStore.connected = true;
  if (chatStore.username) sessionStorage.setItem("username", chatStore.username);
});

socket.on("disconnect", () => {
  chatStore.connected = false;
  chatStore.users = [];
});
</script>

<template>
  <header class="mb-10">
    <h1 class="text-center text-4xl text-black sm:text-5xl">
      {{ $t("base-layout.title") }}
    </h1>
  </header>
  <div class="flex justify-center">
    <RouterView />
  </div>
  <footer class="mt-20 flex w-full justify-center p-2 text-xs font-thin text-slate-300">
    <span>{{ $t("base-layout.footer") }}&nbsp;</span>
    <a
      href="https://echevarria.pt"
      target="_blank"
      class="rounded-lg transition duration-200 hover:text-gray-400 hover:underline hover:underline-offset-2 focus:ring focus:ring-yellow-300"
    >
      echevarria
    </a>
  </footer>
</template>
