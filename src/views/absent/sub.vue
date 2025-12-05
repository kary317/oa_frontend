<template>
  <OADialog title="处理考勤" v-model="dialogVisible" @submit="onSubmitAbsent">
    <el-form
      :model="absentForm"
      :rules="rules"
      ref="absentFormRef"
      label-width="100px"
    >
      <el-form-item label="结果" prop="status">
        <el-radio-group v-model="absentForm.status">
          <el-radio :value="2">通过</el-radio>
          <el-radio :value="3">拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="理由" prop="response_content">
        <el-input
          type="textarea"
          v-model="absentForm.response_content"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
  </OADialog>
  <OAMain title="下属考勤">
    <el-card>
      <el-table :data="absents" style="width: 100%">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="absent_type.name" label="类型" />
        <el-table-column prop="request_content" label="原因" />
        <el-table-column label="发起时间">
          <template #default="scope">
            {{ timeFormatter.stringFromDateTime(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="start_date" label="开始日期" />
        <el-table-column prop="end_date" label="结束日期" />
        <el-table-column prop="responder.realname" label="审核领导" />

        <el-table-column prop="response_content" label="反馈意见" />
        <el-table-column prop="status" label="审核状态">
          <template #default="scope">
            <el-tag type="info" v-if="scope.row.status == 1">审核中</el-tag>
            <el-tag type="success" v-else-if="scope.row.status == 2"
              >已通过</el-tag
            >
            <el-tag type="danger" v-else>已拒绝</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="处理">
          <template #default="scope">
            <el-button
              v-if="scope.row.status == 1"
              type="primary"
              icon="EditPen"
              @click="onShowDialog"
            />
            <el-button v-else disabled type="default">已处理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <OAPagination
          :total="pagination.total"
          v-model="pagination.page"
        ></OAPagination>
      </template>
    </el-card>
  </OAMain>
</template>
<script setup name="subabsent">
import OAPageHeader from "@/components/OAPageHeader.vue";
import { reactive, ref, onMounted } from "vue";
import absentHttp from "@/api/absentHttp";
import { ElMessage } from "element-plus";
import timeFormatter from "@/utils/timeFormatter";

import OAMain from "@/components/OAMain.vue";
import OAPagination from "@/components/OAPagination.vue";
import OADialog from "@/components/OADialog.vue";

let absents = ref([]);
let pagination = reactive({
  total: 0,
  page: 1,
});

let dialogVisible = ref(false);
let absentForm = reactive({
  status: 2,
  response_content: "",
});
let rules = reactive({
  status: [{ required: true, message: "请选择处理结果!", trigger: "change" }],
  response_content: [
    { required: true, message: "请输入理由！", trigger: "blur" },
  ],
});

let absentFormRef = ref();
onMounted(async () => {
  try {
    let data = await absentHttp.getSubAbsents();
    pagination.total = data.count;
    absents.value = data.results;
  } catch (error) {
    ElMessage.error(error.detail);
  }
});

const onShowDialog = () => {
  dialogVisible.value = true;
};
</script>
<style scoped></style>
