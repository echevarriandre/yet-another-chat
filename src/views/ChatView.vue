<script setup lang="ts">
import socket from "@/socket";
import { useChatStore } from "@/stores/chat";
import { CS, SC, type User } from "@/types";
import TButton from "../components/ui/t-button.vue";

const { users } = useChatStore();
let message = $ref("");
let selectedUser = $ref<User | null>(null);

socket.on(SC.Users, (activeUsers: User[]) => {
  activeUsers.forEach((u) => {
    u.messages = [];
  });
  users.push(...activeUsers);
  socket.off(SC.Users);
});

socket.on(SC.UserConnected, (user: User) => {
  user.messages = [];
  users.push(user);
});

socket.on(SC.UserDisconnected, (userId: string) => {
  const index = users.findIndex((u) => u.id === userId);
  users.splice(index, 1);
  if (selectedUser?.id === userId) selectedUser = null;
});

socket.on(SC.Message, (message, from) => {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.id !== from) continue;

    user.messages.push({ content: message, fromSelf: false });
    if (user !== selectedUser) user.hasNewMessages = true;
    break;
  }
});

function handleSelectUser(user: User) {
  selectedUser = user;
  user.hasNewMessages = false;
}

function sendMessage() {
  if (!selectedUser || !message) return;
  socket.emit(CS.Message, message, selectedUser.id);
  selectedUser.messages.push({ content: message, fromSelf: true });
  message = "";
}

onUnmounted(() => {
  socket.off(SC.Users);
  socket.off(SC.UserConnected);
  socket.off(SC.UserConnected);
});
</script>

<template>
  <main class="mx-8 flex max-h-96 gap-10">
    <aside class="h-full min-h-[24rem] w-52 overflow-auto rounded-2xl bg-slate-100">
      <ul class="mt-2 flex flex-col gap-2">
        <li
          v-for="u in users"
          :key="u.id"
          @click="handleSelectUser(u)"
          class="mx-2 flex cursor-pointer items-center gap-2 rounded-lg bg-slate-200 p-2 hover:bg-black hover:text-white"
          :class="{ 'bg-black text-white': selectedUser?.id == u.id }"
        >
          <figure class="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" v-if="u.hasNewMessages" />
          <span :title="u.username" class="overflow-hidden overflow-ellipsis">{{ u.username }}</span>
        </li>
      </ul>
    </aside>
    <section class="relative flex w-96 flex-col gap-2 rounded-2xl bg-slate-100 p-2">
      <div
        class="flex h-full flex-col-reverse gap-2 overflow-auto rounded-lg"
        :class="{ 'items-center justify-center': !selectedUser }"
      >
        <span v-if="!selectedUser" class="text-gray-400">{{ $t("chat.noUserSelected") }}</span>
        <div
          v-else
          v-for="(m, i) in [...selectedUser?.messages].reverse()"
          :key="i"
          class="w-fit max-w-[75%] break-words rounded-lg p-2"
          :class="{ 'self-end bg-gray-200': m.fromSelf, 'bg-yellow-200': !m.fromSelf }"
        >
          <span>{{ m.content }}</span>
        </div>
      </div>
      <div v-if="selectedUser" class="mt-2 flex w-full gap-2">
        <input
          type="text"
          v-model="message"
          @keyup.enter="sendMessage"
          :placeholder="$t('chat.messageInputPlaceholder')"
          class="h-fit w-full rounded-lg bg-slate-200 p-2 transition duration-200 hover:bg-white hover:ring hover:ring-slate-200 focus:bg-white focus:ring focus:ring-slate-200 disabled:text-slate-600"
        />
        <TButton @click="sendMessage">Send</TButton>
      </div>
    </section>
  </main>
</template>
