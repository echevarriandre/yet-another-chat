<script setup lang="ts">
defineProps<{
  username: string;
  active?: boolean;
}>();
</script>

<template>
  <div
    class="w-full cursor-pointer rounded-lg bg-slate-200 p-2 text-center transition duration-200 hover:ring hover:ring-yellow-300"
    :class="{ 'bg-yellow-200': active }"
  >
    {{ username }}
  </div>
</template>
