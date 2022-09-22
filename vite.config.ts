import { fileURLToPath, URL } from "url";
import { join } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 8080 },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnable: true,
        modifyVars: {
          hack: `
            true; 
            @import "${join(__dirname, "./src/assets/styles/variables.less")}"; 
            @import "${join(__dirname, "./src/assets/styles/mixin.less")}";
          `,
        },
      },
    },
  },
});
