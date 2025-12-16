import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Login from "@/views/login/Login.vue";
import Frame from "@/views/main/Frame.vue";
import { useAuthStore } from "@/stores/auth";
import myabsent from "@/views/absent/my.vue";
import subabsent from "@/views/absent/sub.vue";

import publish from "@/views/inform/publish.vue";
import inform_detail from "@/views/inform/detail.vue";
import inform_list from "@/views/inform/list.vue";

import staffadd from "@/views/staff/add.vue";
import stafflist from "@/views/staff/list.vue";

import home from "@/views/home/home.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Frame",
      component: Frame,
      children: [
        { path: "/", name: "home", component: home },
        { path: "/absent/my", name: "myabsent", component: myabsent },
        { path: "/absent/sub", name: "subabsent", component: subabsent },
        { path: "/inform/publish", name: "inform_publish", component: publish },
        { path: "/inform/list", name: "inform_list", component: inform_list },
        {
          path: "/inform/detail/:pk",
          name: "inform_detail",
          component: inform_detail,
        },
        { path: "/staff/add", name: "staff_add", component: staffadd },
        { path: "/staff/list", name: "staff_list", component: stafflist },
      ],
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
