import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Login from "@/views/login/Login.vue";
import Frame from "@/views/main/Frame.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Frame",
      component: Frame,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});

export default router;
