<script setup lang="ts">
import TButton from "../ui/t-button.vue";
import UserListItem from "./UserListItem.vue";

let selectedUser = $ref<number | null>(null);

function handleSelectUser(id: number) {
  if (id === selectedUser) {
    selectedUser = null;
    return;
  }

  selectedUser = id;
}

function handleEnterChat() {
  alert(`todo: ${selectedUser}`);
}
</script>

<template>
  <div class="flex min-h-fit w-full flex-col gap-5">
    <div class="flex max-h-[24rem] w-full flex-col items-center gap-2 overflow-auto rounded-lg bg-gray-100 p-4">
      <UserListItem v-for="n in 5" :key="n" :id="n" @click="handleSelectUser(n)" :active="selectedUser === n" />
    </div>
    <TButton @click="handleEnterChat" :disabled="!selectedUser">{{ $t("chat.buttonEnterChat") }}</TButton>
  </div>
</template>
