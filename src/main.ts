import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import { createManager } from "@vue-youtube/core"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./components/Home.vue"),
    },
    {
      path: "/video",
      component: () => import("./components/Video.vue"),
    },
  ],
})

createApp(App).use(createManager()).use(router).mount("#app")

