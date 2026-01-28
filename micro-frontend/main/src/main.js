import { createApp } from "vue";
import App from "./App.vue";
import { registerMicroApps, start } from "qiankun";
createApp(App).mount("#app");

registerMicroApps([
  {
    name: "micro01-app",
    entry: "//localhost:8888",
    container: "#micro01",
    activeRule: "/micro01",
  },
  {
    name: "micro02",
    entry: "//localhost:9999",
    container: "#micro02",
    activeRule: "/micro02",
  },
]);
start();

