import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/normalize.css";
import "./assets/styles/styles.scss"; // Tailwind CSS와 SCSS 파일 추가
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);

// Vue 경고 무시 설정
app.config.warnHandler = (msg, vm, trace) => {
  // 특정 경고 메시지를 무시
  if (msg.includes("<TransitionGroup> children must be keyed")) {
    return; // 이 경고는 무시
  }

  // 다른 경고는 콘솔에 출력
  console.warn(`[Vue warn]: ${msg}\n${trace}`);
};

app.use(store);
app.use(router);
app.mount("#app");
