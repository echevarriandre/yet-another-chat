<template>
  <button
    class="rounded-lg bg-black p-2 text-white transition-all duration-200 hover:bg-white hover:text-black hover:ring hover:ring-black focus:bg-white focus:text-black focus:ring focus:ring-yellow-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:ring-0"
    type="button"
  >
    <slot />
  </button>
</template>

<script setup lang="ts"></script>
