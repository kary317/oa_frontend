import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  // 定义成内部私有属性
  let _user = ref({});
  let _token = ref("");

  const USER_KEY = "OA_USER_KEY";
  const TOKEN_KEY = "OA_TOKEN_KEY";

  const setUserToken = (user, token) => {
    // 客户端内存中
    _user.value = user;
    _token.value = token;

    //浏览器localStorage,硬盘持久化
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);
  };

  // 开放私有属性外部访问接口
  let user = computed(() => {
    if (!_user.value) {
      _user.value = localStorage.getItem(USER_KEY);
    }
    return _user.value;
  });

  let token = computed(() => {
    if (!_token.value) {
      _token.value = localStorage.getItem(TOKEN_KEY);
    }
    return _token.value;
  });

  return { setUserToken, user, token };
});
