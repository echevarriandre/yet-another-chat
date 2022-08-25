<script setup lang="ts">
import { RouteNames } from "@/router";
import { Icon } from "@iconify/vue";
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useHead({ title: t("home.title") });
</script>

<template>
  <main class="mt-10 flex flex-col items-center gap-10">
    <div class="flex items-center gap-2 text-red-400">
      <Icon class="h-5 w-5" icon="heroicons-solid:home" />
      <span class="text-xl">{{ $t("home.title") }}</span>
    </div>
    <p>{{ $t("home.welcome") }}</p>

    <RouterLink :to="{ name: RouteNames.About }">{{ $t("about.title") }}</RouterLink>
  </main>
</template>
