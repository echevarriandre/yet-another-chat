import vueI18n from "@intlify/vite-plugin-vue-i18n";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    vueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: path.resolve(__dirname, "locales/**"),
    }),
  ],
});
