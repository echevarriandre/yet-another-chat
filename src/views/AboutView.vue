<template>
  <main class="mt-10 flex flex-col items-center gap-10">
    <div class="flex items-center gap-2 text-red-400">
      <Icon class="h-5 w-5" icon="heroicons-solid:information-circle" />
      <span class="text-xl">{{ $t("about.title") }}</span>
    </div>
    <p>{{ $t("about.description") }}</p>

    <RouterLink :to="{ name: RouteNames.Home }">{{ $t("home.title") }}</RouterLink>
  </main>
</template>

<script setup lang="ts">
import { RouteNames } from "@/router";
import { Icon } from "@iconify/vue";
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

useHead({ title: t("about.title") });
</script>
