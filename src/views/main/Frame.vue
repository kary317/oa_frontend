<script setup name="frame">
import { reactive, ref } from "vue";
import { computed } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import authHttp from "@/api/authHttp";
import { ElMessage } from "element-plus";

// 验证authStore的小bug
// import { useAuthStore } from "@/stores/auth";
// const authStore = useAuthStore();
// console.log('user:',authStore.user);

import { useRouter } from "vue-router";
const router = useRouter();

import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

let isCollapse = ref(true);

let asideWidth = computed(() => {
  if (isCollapse.value) {
    return "64px";
  } else {
    return "250px";
  }
});

let dialogVisible = ref(false);
let resetPwdForm = reactive({
  oldpwd: "",
  pwd1: "",
  pwd2: "",
});

const formLabelWidth = "100px";
let rules = reactive({
  oldpwd: [
    { required: true, message: "请输入原密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度在6-20位之间", trigger: "blur" },
  ],
  pwd1: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度在6-20位之间", trigger: "blur" },
  ],
  pwd2: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度在6-20位之间", trigger: "blur" },
  ],
});

let formTag = ref();

const onControlResetPwdDialog = () => {
  resetPwdForm.oldpwd = "";
  resetPwdForm.pwd1 = "";
  resetPwdForm.pwd2 = "";
  dialogVisible.value = true;
};

const onsubmit = () => {
  formTag.value.validate(async (valid, fields) => {
    if (valid) {
      // console.log("字段校验正确");
      try {
        let res = await authHttp.resetPwd(
          resetPwdForm.oldpwd,
          resetPwdForm.pwd1,
          resetPwdForm.pwd2
        );
        // 不用后端返回的信息 ElMessage.success(res.detail);
        ElMessage.success("密码修改成功!");
        dialogVisible.value = false;
      } catch (error) {
        ElMessage.error(error.detail);
      }
    } else {
      ElMessage.info("请按要求填写字段");
    }
  });
};

const onCollapseAside = () => {
  isCollapse.value = !isCollapse.value;
};

const onExit = () => {
  authStore.clearUserToken();
  router.push({ name: "Login" });
};
</script>

<template>
  <el-container class="container">
    <el-aside :width="asideWidth" class="aside">
      <router-link :to="{ name: 'Frame' }" class="brand"
        >OA<span v-show="!isCollapse">系统</span></router-link
      >
      <el-menu
        active-text-color="#ffd04b"
        background-color="#343a40"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
      >
        <el-menu-item index="1">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><Checked /></el-icon>
            <span>考勤管理</span>
          </template>

          <el-menu-item index="2-1" :route="{ name: 'myabsent' }">
            <el-icon><UserFilled /></el-icon>
            <span>个人考勤</span>
          </el-menu-item>
          <el-menu-item index="2-2" :route="{ name: 'subabsent' }">
            <el-icon><User /></el-icon>
            <span>下属考勤</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><BellFilled /></el-icon>
            <span>通知管理</span>
          </template>

          <el-menu-item index="3-1" :route="{ name: 'inform_publish' }">
            <el-icon><CirclePlusFilled /></el-icon>
            <span>发布通知</span>
          </el-menu-item>
          <el-menu-item index="3-2" :route="{ name: 'inform_list' }">
            <el-icon><List /></el-icon>
            <span>通知列表</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><Avatar /></el-icon>
            <span>员工管理</span>
          </template>

          <el-menu-item index="4-1">
            <el-icon><CirclePlusFilled /></el-icon>
            <span>新增员工</span>
          </el-menu-item>
          <el-menu-item index="4-2">
            <el-icon><List /></el-icon>
            <span>员工列表</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="left_header">
          <el-button
            :icon="Fold"
            v-show="!isCollapse"
            @click="onCollapseAside"
          />
          <el-button
            :icon="Expand"
            v-show="isCollapse"
            @click="onCollapseAside"
          />
        </div>

        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :size="30" icon="UserFilled" />
            <span
              >[{{ authStore.user.department.name }}]{{
                authStore.user.realname
              }}</span
            >
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="onControlResetPwdDialog"
                >修改密码</el-dropdown-item
              >

              <el-dropdown-item divided @click="onExit"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <el-main class="main"><RouterView></RouterView></el-main>
    </el-container>
  </el-container>

  <el-dialog v-model="dialogVisible" title="修改密码" width="500">
    <el-form :model="resetPwdForm" :rules="rules" ref="formTag">
      <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldpwd">
        <el-input
          v-model="resetPwdForm.oldpwd"
          autocomplete="off"
          type="password"
        />
      </el-form-item>

      <el-form-item label="新密码" :label-width="formLabelWidth" prop="pwd1">
        <el-input
          v-model="resetPwdForm.pwd1"
          autocomplete="off"
          type="password"
        />
      </el-form-item>

      <el-form-item label="确认密码" :label-width="formLabelWidth" prop="pwd2">
        <el-input
          v-model="resetPwdForm.pwd2"
          autocomplete="off"
          type="password"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onsubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.container {
  height: 100vh;
  background-color: #f4f6f9;
}

.aside {
  background-color: #343a40;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22) !important;
}

.aside .brand {
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid #434a50;
  background-color: #232631;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-menu {
  border-right: none;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
