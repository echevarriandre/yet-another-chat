import "@/assets/base.css";
import { createHead } from "@vueuse/head";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createHead());
app.use(createPinia());
app.use(router);

const messages = Object.fromEntries(
  Object.entries(import.meta.glob<{ default: never }>("../locales/*.y(a)?ml", { eager: true })).map(([key, value]) => [
    key.slice(11, -4),
    value.default,
  ]),
);
const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
  globalInjection: true,
});
app.use(i18n);

app.mount("#app");
