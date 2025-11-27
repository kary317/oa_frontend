import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Login from "@/views/login/Login.vue";
import Frame from "@/views/main/Frame.vue";
import { useAuthStore } from "@/stores/auth";

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

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  // 傻逼写法,警惕自己
  // if (!authStore.is_logined && !to.name == "Login") {
  if (!authStore.is_logined && to.name != "Login") {
    return { name: "Login" };
  }
});

export default router;
