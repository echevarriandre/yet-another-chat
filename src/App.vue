<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <header class="mb-10">
    <h1 class="text-center text-4xl text-black sm:text-5xl">
      {{ $t("login.title") }}
    </h1>
  </header>
  <main class="flex w-full justify-center">
    <RouterView />
  </main>
  <footer class="mt-20 flex w-full justify-center p-2 text-xs font-thin text-slate-300">
    <span>made by&nbsp;</span>
    <a
      href="https://echevarria.pt"
      target="_blank"
      class="rounded-lg transition duration-200 hover:text-gray-400 hover:underline hover:underline-offset-2 focus:ring focus:ring-yellow-300"
    >
      echevarria
    </a>
  </footer>
</template>
