<template>
  <el-space direction="vertical" fill :size="20" style="width: 100%">
    <OAPageHeader content="个人考勤"></OAPageHeader>
    <el-card style="text-align: right">
      <el-button type="primary" @click="onShowDialog"
        ><el-icon><Plus /></el-icon>发起考勤
      </el-button>
    </el-card>
  </el-space>

  <el-dialog v-model="dialogFormVisible" title="发起请假" width="500">
    <el-form :model="absentForm" :rules="rules" ref="absentFormRef">
      <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
        <el-input v-model="absentForm.title" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="请假类型"
        :label-width="formLabelWidth"
        prop="absent_type_id"
      >
        <el-select
          v-model="absentForm.absent_type_id"
          placeholder="请选择请假类型"
        >
          <el-option
            v-for="(item, index) in absent_types"
            :key="item.name"
            label="item.name"
            value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="请假时间"
        :label-width="formLabelWidth"
        prop="date_range"
      >
        <el-date-picker
          v-model="absentForm.date_range"
          type="daterange"
          range-separator="到"
          start-placeholder="起始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="审批领导" :label-width="formLabelWidth">
        <el-input
          readonly
          disabled
          value="[dongdong@qq.com]东东"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="请假理由"
        :label-width="formLabelWidth"
        prop="request_content"
      >
        <el-input
          type="textarea"
          autocomplete="off"
          v-model="absentForm.request_content"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmitAbsent"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup name="myabsent">
import OAPageHeader from "@/components/OAPageHeader.vue";
import { reactive, ref } from "vue";

let dialogFormVisible = ref(false);
let absentForm = reactive({
  title: "",
  absent_type_id: null,
  date_range: [],
  request_content: "",
});
let formLabelWidth = "100px";
let absent_types = ref([]);

let absentFormRef = ref();
let rules = reactive({
  title: [{ required: true, message: "请输入标题!", trigger: "blur" }],
  absent_type_id: [
    { required: true, message: "请选择请假类型!", trigger: "change" },
  ],
  date_range: [{ required: true, message: "请选择请假时间!", trigger: "blur" }],
  request_content: [
    { required: true, message: "请输入请假理由!", trigger: "blur" },
  ],
});
const onShowDialog = () => {
  absentForm.title = "";
  absentForm.absent_type_id = null;
  absentForm.date_range = [];
  absentForm.request_content = "";
  dialogFormVisible.value = true;
};

const onSubmitAbsent = () => {
  console.log(absentForm);
};
</script>

<style></style>
