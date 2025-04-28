import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/normalize.css";
import "./assets/styles/styles.scss"; // Tailwind CSS와 SCSS 파일 추가
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const basePath =
      process.env.NODE_ENV === "production" ? "/HJH_Portfolio" : "";
    navigator.serviceWorker
      .register(`${basePath}/service-worker.js`)
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
// Vue 경고 무시 설정
app.config.warnHandler = (msg, vm, trace) => {
  // 특정 경고 메시지를 무시
  if (msg.includes("<TransitionGroup> children must be keyed")) {
    return; // 이 경고는 무시
  }

  // 다른 경고는 콘솔에 출력
  console.warn(`[Vue warn]: ${msg}\n${trace}`);
};
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setViewportHeight();
window.addEventListener("resize", setViewportHeight);

app.use(store);
app.use(router);
app.mount("#app");
