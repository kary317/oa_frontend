<script setup name="home">
import OAMain from "@/components/OAMain.vue";
import { ref, reactive, onMounted } from "vue";
import homeHttp from "@/api/homeHttp";
import { ElMessage } from "element-plus";
import * as echarts from "echarts";

onMounted(async () => {
  try {
    let rows = await homeHttp.getDepartmentStaffCount();
    console.log(rows);

    let xdatas = [];
    let ydatas = [];
    for (let row of rows) {
      xdatas.push(row.name);
      ydatas.push(row.staff_count);
    }

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(
      document.getElementById("department-staff-count")
    );
    // 绘制图表
    myChart.setOption({
      tooltip: {},
      xAxis: {
        data: xdatas,
      },
      yAxis: {},
      series: [
        {
          name: "员工数量",
          type: "bar",
          data: ydatas,
        },
      ],
    });
  } catch (error) {
    ElMessage.error(error);
  }
});
</script>

<template>
  <OAMain title="首页">
    <el-card>
      <template #header>
        <h2>部门员工数量</h2>
      </template>
      <div id="department-staff-count" style="width: 100%; height: 300px"></div
    ></el-card>
  </OAMain>
</template>

<style scoped></style>
