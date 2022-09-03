<script setup lang="ts">
import { RouteNames } from "@/router/routes";
import { useServerStore } from "@/stores/server";
import { useRouter } from "vue-router";
import TButton from "../ui/t-button.vue";
import ChatListItem from "./ChatListItem.vue";

const router = useRouter();
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
  if (!selectedUser) return;
  server.askToChat(selectedUser);
}

function acceptRequest() {
  server.acceptRequest();
  router.push({ name: RouteNames.Chat });
}
</script>

<template>
  <div class="flex min-h-fit w-full flex-col gap-5">
    <div class="flex max-h-[24rem] w-full flex-col items-center gap-2 overflow-auto rounded-lg bg-gray-100 p-4">
      <ChatListItem
        v-for="user in server.users"
        :key="user.id"
        :username="user.username"
        @click="handleSelectUser(user.id)"
        :active="selectedUser === user.id"
      />

      <p v-if="server.users.length === 0" class="text-slate-700">{{ $t("chat.noUsers") }}</p>
    </div>
    <TButton @click="handleEnterChat" :disabled="!selectedUser">{{ $t("chat.buttonEnterChat") }}</TButton>

    <div class="flex flex-col gap-2">
      <TButton v-if="server.incomingRequest" @click="acceptRequest">
        Accept request from {{ server.requestUsername }}
      </TButton>
      <TButton v-if="server.incomingRequest" @click="server.acceptRequest">
        Reject request from {{ server.requestUsername }}
      </TButton>
    </div>
  </div>
</template>
