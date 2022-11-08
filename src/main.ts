import { createApp } from "vue";
import { createPinia } from "pinia";
import "normalize.css";
import "@/assets/styles/common.less";
import App from "./App.vue";
import router from "./router";
import piniaPersistedState from "pinia-plugin-persistedstate";
import messagePlugin from "./utils/messagePlugin";
import myConfirm from "./utils/messagePlugin";
import worker from "@/mocks/browser";
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersistedState);
app.use(pinia);
app.use(router);
app.use(messagePlugin);
app.use(myConfirm);
worker.start({ onUnhandledRequest: "bypass", quiet: true });
app.mount("#app");
// if (process.env.NODE_ENV === "development") {
//   // const worker = require("./mocks/browser").default;
//   // onUnhandledRequest: "bypass"
//   // 绕过未拦截的请求, 不要发出警告
//   // quiet: true
//   // 安静模式, 对于拦截成功的请求不要在控制台中进行输出提示
//   worker.start({ onUnhandledRequest: "bypass", quiet: true });
// }
// worker.start({ onUnhandledRequest: "bypass", quiet: true });
