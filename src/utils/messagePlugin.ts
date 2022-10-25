import message from "./message";
import type { App } from "vue";
export default {
  install(app: App) {
    app.config.globalProperties.$message = message;
  },
};
