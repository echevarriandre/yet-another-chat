<script setup lang="ts">
import { RouteNames } from "@/router";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import TButton from "../components/ui/t-button.vue";
import TInput from "../components/ui/t-input.vue";

const username = $ref("");
const userStore = useUserStore();
const router = useRouter();

function login() {
  // TODO validate with FormKit or similar package
  if (!username) return;

  userStore.username = username;
  router.push(RouteNames.Chat);
}
</script>

<template>
  <section class="flex w-full flex-col items-center gap-10">
    <form @submit.prevent class="flex w-full flex-col gap-5">
      <TInput :label="$t('login.usernameInput')" v-model="username" type="text" required />
      <TButton @click="login" :disabled="!username">{{ $t("login.buttonLogin") }}</TButton>
    </form>
  </section>
</template>
