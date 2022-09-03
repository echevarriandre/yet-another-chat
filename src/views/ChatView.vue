<script setup lang="ts">
import { useServerStore } from "@/stores/server";
import ChatList from "../components/chat/ChatList.vue";

const server = useServerStore();
server.listenUsersUpdate();
server.listenToChatRequests();
</script>

<template>
  <section class="w-full">
    <chat-list />
  </section>
</template>
