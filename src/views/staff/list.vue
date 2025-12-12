<script setup name="stafflist">
import OAMain from "@/components/OAMain.vue";
import { ref, reactive, onMounted, watch } from "vue";
import staffHttp from "@/api/staffHttp";
import { ElMessage } from "element-plus";
import timeFormatter from "@/utils/timeFormatter";

let staffs = ref([]);
let pagination = reactive({
  page: 1,
  total: 0,
});
let page_size = ref(10);

async function fetchStaffList(page, page_size) {
  try {
    let data = await staffHttp.getStaffList(page, page_size);
    pagination.total = data.count;
    staffs.value = data.results;
  } catch (error) {
    ElMessage.error(error.detail);
  }
}

onMounted(async () => {
  fetchStaffList(1, page_size.value);
});

watch(
  () => pagination.page,
  async function (value) {
    fetchStaffList(value, page_size.value);
  }
);

watch(page_size, function (value) {
  if (pagination.page == 1) {
    fetchStaffList(1, value);
  } else {
    pagination.page = 1;
  }
});
</script>

<template>
  <OAMain title="员工列表">
    <el-card>
      <el-table :data="staffs">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" width="60">
          <template #default="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="realname" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="入职时间">
          <template #default="scope">
            {{ timeFormatter.stringFromDate(scope.row.date_joined) }}
          </template>
        </el-table-column>
        <el-table-column prop="department.name" label="部门"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
            <el-tag v-else-if="scope.row.status == 2" type="warning"
              >未激活</el-tag
            >
            <el-tag v-else type="danger">已锁定</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" icon="Edit" circle></el-button>
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <div style="display: flex; justify-content: space-between">
          <el-form-item label="每页：">
            <el-select v-model="page_size" size="small" style="width: 100px">
              <el-option select label="10条/页" :value="10" />
              <el-option label="20条/页" :value="20" />
            </el-select>
          </el-form-item>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="pagination.total"
            v-model:currentPage="pagination.page"
            :page-size="page_size"
          />
        </div>
      </template>
    </el-card>
  </OAMain>
</template>

<style scoped></style>
