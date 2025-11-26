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

  // 验证小bug
  // let a = {};
  // if (a) {
  //   //空对象,if判断会返回true
  //   console.log(true);
  // }
  // let b = "";
  // if (b) {
  //   //空字符串,if判断返回false
  //   console.log(true);
  // }

  // 开放私有属性外部访问接口
  // 修正bug:通过Object.keys(_user.value) == 0判断是不是空对象
  let user = computed(() => {
    // if (!_user.value) {
    if (Object.keys(_user.value) == 0) {
      const user_str = localStorage.getItem(USER_KEY);
      if (user_str) {
        _user.value = JSON.parse(user_str);
      }
    }
    return _user.value;
  });

  let token = computed(() => {
    if (!_token.value) {
      const token_str = localStorage.getItem(TOKEN_KEY);
      if (token_str) {
        _token.value = token_str;
      }
    }
    return _token.value;
  });

  return { setUserToken, user, token };
});
