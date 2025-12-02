<script setup name="OAPagination">
import { defineModel, defineProps } from "vue";

let page = defineModel({ required: true });

let props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
});
</script>

<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="props.total"
    v-model:current-page="page"
    :page-size="props.pageSize"
  />
</template>

<style scoped>
.el-pagination {
  justify-content: center;
}
</style>
