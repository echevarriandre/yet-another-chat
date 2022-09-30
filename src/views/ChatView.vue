<script setup lang="ts">
import { RouteNames } from "@/router/routes";
import socket from "@/socket";
import { useChatStore } from "@/stores/chat";
import { CS, SC, type User } from "@/types";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import TButton from "../components/ui/t-button.vue";

const chatStore = useChatStore();
let message = $ref("");
let selectedUser = $ref<User | null>(null);

socket.on(SC.Users, (activeUsers: User[]) => {
  activeUsers.forEach((u) => {
    u.messages = [];
  });
  chatStore.users.push(...activeUsers);
  socket.off(SC.Users);
});

socket.on(SC.UserConnected, (user: User) => {
  user.messages = [];
  chatStore.users.push(user);
});

socket.on(SC.UserDisconnected, (userId: string) => {
  const index = chatStore.users.findIndex((u) => u.id === userId);
  chatStore.users.splice(index, 1);
  if (selectedUser?.id === userId) selectedUser = null;
});

socket.on(SC.Message, (message, from) => {
  for (let i = 0; i < chatStore.users.length; i++) {
    const user = chatStore.users[i];
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

const router = useRouter();
function handleLogout() {
  chatStore.logout();
  router.push({ name: RouteNames.Login });
}

onUnmounted(() => {
  socket.off(SC.Users);
  socket.off(SC.UserConnected);
  socket.off(SC.UserConnected);
});
</script>

<template>
  <main class="mx-8 flex max-h-96 flex-col gap-10">
    <header class="flex items-center justify-between">
      <span class="flex items-center gap-2 text-2xl"> {{ $t("chat.greeting") }} {{ chatStore.username }}! </span>
      <div class="flex items-center gap-2">
        <span class="rounded bg-green-500 p-1 text-xs text-white" :class="{ 'bg-red-500': !chatStore.connected }">
          {{ chatStore.connected ? $t("chat.connected") : $t("chat.disconnected") }}
        </span>
        <button @click="handleLogout" class="rounded-full p-2 text-black transition-all duration-200 hover:bg-gray-100">
          <Icon icon="heroicons:arrow-right-on-rectangle" class="h-6 w-6" />
        </button>
      </div>
    </header>

    <div class="flex gap-10">
      <aside class="h-full min-h-[24rem] w-72 overflow-auto rounded-2xl bg-slate-100 md:w-52">
        <ul class="mt-2 flex flex-col gap-2">
          <li
            v-for="u in chatStore.users"
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

      <section class="relative hidden w-96 flex-col gap-2 rounded-2xl bg-slate-100 p-2 md:flex">
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
    </div>
  </main>
</template>
