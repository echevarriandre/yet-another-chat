<script setup lang="ts">
import { RouteNames } from "@/router/routes";
import socket from "@/socket";
import { useRouter } from "vue-router";
import TButton from "../components/ui/t-button.vue";
import TInput from "../components/ui/t-input.vue";

const username = $ref("");
const router = useRouter();

socket.on("connect_error", (error) => {
  // TODO handle error
  alert(error.message);
});

function login() {
  if (!username) return;

  // TODO save user to chat store
  socket.auth = { username: username };
  socket.connect();
  router.push({ name: RouteNames.Chat });
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
