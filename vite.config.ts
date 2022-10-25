import { fileURLToPath, URL } from "url";
import { join } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 8080 },
  plugins: [
    vue(),
    vueJsx(),
    //自动注册路由
    Components({
      // 指定组件位置，默认是 src/components
      dirs: ["src/components", "src/views"],
      // 搜索子目录
      deep: true,
      // 组件的有效文件扩展名
      extensions: ["vue"],
      // 配置文件生成位置
      dts: "components.d.ts",
    }),
    //自动引入库
    AutoImport({
      // 注册要自动引入的库
      imports: ["vue", "vue-router", "pinia", "@vueuse/core", "vee-validate"],
      //, "@vueuse/core"
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: "auto-import.d.ts",
    }),
  ],
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
