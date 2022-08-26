<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import TInput from "../components/ui/t-input.vue";

const username = $ref("");
const userStore = useUserStore();

function login() {
  // TODO validate with FormKit or similar package
  userStore.username = username;
}
</script>

<template>
  <main class="relative top-1/4 flex flex-col items-center gap-10 text-center">
    <h1 class="text-5xl text-black">{{ $t("login.title") }}</h1>

    <form @submit.prevent class="flex w-1/4 min-w-min flex-col gap-5">
      <TInput :label="$t('login.usernameInput')" v-model:modelValue="username" type="text" required />
      <button
        class="pointer rounded-lg bg-black p-2 text-white transition-all duration-300 hover:bg-white hover:text-black hover:ring hover:ring-black focus:bg-white focus:text-black focus:ring focus:ring-red-500 focus-visible:outline-none"
        type="button"
        @click.prevent="login"
      >
        {{ $t("login.buttonLogin") }}
      </button>
    </form>
  </main>
</template>
