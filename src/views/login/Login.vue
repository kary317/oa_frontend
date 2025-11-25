<script setup name="login">
import login_img from "@/assets/image/login.png";
import { reactive } from "vue";
import axios from "axios";

let form = reactive({
  email: "",
  password: "",
});

const onSubmit = () => {
  //   console.log(form.email);
  //   console.log(form.password);

  let pwdRgx = /^[0-9a-zA-Z_-]{6,20}/;
  let emailRgx = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9])+/;

  if (!emailRgx.test(form.email)) {
    alert("邮箱格式不正确");
    return;
  }

  if (!pwdRgx.test(form.password)) {
    alert("密码格式不正确");
    return;
  }

  axios
    .post("http://127.0.0.1:8000/auth/login/", {
      email: form.email,
      password: form.password,
    })
    .then((res) => {
      console.log(res);

      // 获取后端返回的正确数据
      console.log(res.data);
      console.log(res.data.token);
      console.log(res.data.user);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      // 获取后端返回的错误数据
      console.log(err.response.data);
      console.log(err.response.data.detail);
    });
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
