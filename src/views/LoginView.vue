<script setup lang="ts">
import socket from "@/socket";
import { useChatStore } from "@/stores/chat";
import TButton from "../components/ui/t-button.vue";
import TInput from "../components/ui/t-input.vue";

const username = $ref("");

socket.on("connect_error", (error) => {
  // TODO handle error
  alert(error.message);
});

const chatStore = useChatStore();
function login() {
  if (!username) return;

  // TODO show loading in button
  chatStore.username = username;
  socket.auth = { username: username };
  socket.connect();
}

onUnmounted(() => {
  socket.off("connect_error");
});
</script>

<template>
  <section class="flex w-96 flex-col items-center gap-10">
    <form @submit.prevent class="flex w-full flex-col gap-5">
      <TInput :label="$t('login.usernameInput')" v-model="username" @keyup.enter="login" type="text" required />
      <TButton @click="login" :disabled="!username">{{ $t("login.buttonLogin") }}</TButton>
    </form>
  </section>
</template>
