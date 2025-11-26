<script setup name="login">
import login_img from "@/assets/image/login.png";
import { reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

import axios from "axios";
import authHttp from "@/api/authHttp";

import { ElMessage } from "element-plus";

const authStore = useAuthStore();
const router = useRouter();

let form = reactive({
  email: "",
  password: "",
});

const onSubmit = async () => {
  //   console.log(form.email);
  //   console.log(form.password);

  let pwdRgx = /^[0-9a-zA-Z_-]{6,20}/;
  let emailRgx = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9])+/;

  if (!emailRgx.test(form.email)) {
    // alert("邮箱格式不正确");
    ElMessage.info("邮箱格式不正确")
    return;
  }

  if (!pwdRgx.test(form.password)) {
    // alert("密码格式不正确");
    ElMessage.info("密码格式不正确")
    return;
  }

  // 第一版:原生axios发送请求
  // axios
  //   .post("http://127.0.0.1:8000/auth/login/", {
  //     email: form.email,
  //     password: form.password,
  //   })
  //   .then((res) => {
  //     // console.log(res);
  //     // 获取后端返回的正确数据
  //     // console.log(res.data);
  //     // console.log(res.data.token);
  //     // console.log(res.data.user);
  //     let user = res.data.user;
  //     let token = res.data.token;
  //     authStore.setUserToken(user, token);
  //     router.push({ name: "Frame" });
  //   })
  //   .catch((err) => {
  //     // console.log(err);
  //     // console.log(err.response);
  //     // 获取后端返回的错误数据
  //     console.log(err.response.data);
  //     console.log(err.response.data.detail);
  //   });

  // 第二版:封装axios,使用封装后的接口
  // authHttp
  //   .login(form.email, form.password)
  //   .then((res) => {
  //     // console.log(res.data);
  //     let user = res.data.user;
  //     let token = res.data.token;
  //     authStore.setUserToken(user, token);
  //     router.push({ name: "Frame" });
  //   })
  //   .catch((err) => {
  //     console.log(err.response.data);
  //     console.log(err.response.data.detail);
  //   });

  // 第三版:使用JS的Promise对象异步方式,不使用Promise的回调
  // 嵌套回调，易产生回调地狱（callback hell）
  // 用同步的风格编写异步代码,把复杂的异步代码，写得像简单的同步代码一样直观
  try {
    let data = await authHttp.login(form.email, form.password);
    // console.log(data);
    let user = data.user;
    let token = data.token;
    authStore.setUserToken(user, token);
    router.push({ name: "Frame" });
  } catch (err) {
    // console.log(err);
    // console.log(err.detail);
    ElMessage.error(err.detail)
  }
};
</script>

<template>
  <div class="dowebok">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img :src="login_img" alt="IMG" />
        </div>

        <div class="login100-form validate-form">
          <span class="login100-form-title"> 员工登陆 </span>

          <div class="wrap-input100 validate-input">
            <input
              class="input100"
              type="text"
              name="email"
              placeholder="邮箱"
              v-model="form.email"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="iconfont icon-fa-envelope" aria-hidden="true"></i>
            </span>
          </div>

          <div class="wrap-input100 validate-input">
            <input
              class="input100"
              type="password"
              name="password"
              placeholder="密码"
              v-model="form.password"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="iconfont icon-fa-lock" aria-hidden="true"></i>
            </span>
          </div>

          <div class="container-login100-form-btn">
            <button class="login100-form-btn" @click="onSubmit">登陆</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/assets/css/login.css"></style>
<style scoped src="@/assets/iconfont/iconfont.css"></style>
