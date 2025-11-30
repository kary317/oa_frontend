<template>
  <el-page-header @back="goBack" title="返回">
    <template #content>
      <span class="text-large font-600 mr-3"> {{ props.content }} </span>
    </template>
  </el-page-header>
</template>

<script setup name="OAPageHeader">
import { useRouter } from "vue-router";
import { defineProps } from "vue";
const props = defineProps({ content: "" });
const router = useRouter();
const goBack = () => {
  router.go(-1);
};
</script>
<style></style>
