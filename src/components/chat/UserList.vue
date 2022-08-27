<script setup lang="ts">
import { useServerStore } from "@/stores/server";
import TButton from "../ui/t-button.vue";
import UserListItem from "./UserListItem.vue";

const server = useServerStore();
server.getUsers();
server.listenUsersUpdate();

let selectedUser = $ref<string | null>(null);
function handleSelectUser(id: string) {
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
      <UserListItem
        v-for="user in server.users"
        :key="user.id"
        :username="user.username"
        @click="handleSelectUser(user.id)"
        :active="selectedUser === user.id"
      />

      <p v-if="server.users.length === 0" class="text-slate-700">{{ $t("chat.noUsers") }}</p>
    </div>
    <TButton @click="handleEnterChat" :disabled="!selectedUser">{{ $t("chat.buttonEnterChat") }}</TButton>
  </div>
</template>
