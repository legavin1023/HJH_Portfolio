import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/reset.css";
import "./assets/styles/styles.scss"; // Tailwind CSS와 SCSS 파일 추가
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
