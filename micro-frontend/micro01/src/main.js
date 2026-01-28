import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import { routes } from "./router";
let app, router;

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

function render(props) {
  const { container } = props;
  router = createRouter({
    history: createWebHistory(
      window.__POWERED_BY_QIANKUN__ ? "/micro01/" : "/"
    ),
    routes,
  });
  app = createApp(App);
  app
    .use(router)
    .mount(
      container
        ? container.querySelector("#app")
        : document.getElementById("app")
    );
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}
export async function mount(props) {
  console.log("[vue] props from main framework", props);
  render(props);
}
export async function unmount() {
  app.unmount();
  app = null;
  router = null;
}

