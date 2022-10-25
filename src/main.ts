import { createApp } from "vue";
import { createPinia } from "pinia";
import "normalize.css";
import "@/assets/styles/common.less";
import App from "./App.vue";
import router from "./router";
import piniaPersistedState from "pinia-plugin-persistedstate";
import messagePlugin from "./utils/messagePlugin";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersistedState);
app.use(pinia);
app.use(router);
app.use(messagePlugin);

app.mount("#app");
