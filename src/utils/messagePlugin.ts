import message from "./message";
import type { App } from "vue";
import myConfirm from "./myConfirm";
export default {
  install(app: App) {
    app.config.globalProperties.$message = message;
    app.config.globalProperties.$confirm = myConfirm;
  },
};
