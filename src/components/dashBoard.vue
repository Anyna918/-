<template>
  <div class="card">
    <TestCard :type="0" :result="results[0]" />
    <TestCard :type="1" :result="results[1]" />
    <TestCard :type="2" :result="results[2]" />
  </div>
  <div ref="gaugeChartRef" class="chart"></div>
  <div style="margin-bottom: 10px">✅ Accuracy</div>
  <a-button type="primary" @click="beginTest">
    <p v-if="testType==1">开始测试</p>
    <p v-else-if="testType==2">统计结果</p>
  </a-button>
</template>

<style>
.card {
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  justify-content: space-between;
}
.chart {
  width: 350px;
  height: 350px;
  border-radius: 10px;
  margin: auto;
}
</style>

<script>
import TestCard from "../components/testCard.vue";

import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts/core";
import { GaugeChart } from "echarts/charts";
import { TitleComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { triangleTest } from "@/utils/triangle.js";
import { calendarTest } from "@/utils/calendar.js"
import { computerTest } from "@/utils/computer.js"

echarts.use([GaugeChart, TitleComponent, TooltipComponent, CanvasRenderer]);

export default {
  name: "DashBoard",
  components: {
    TestCard,
  },
  props: {
    testType: Number, // 测试类型
    titleKey: Number // 题目索引
  },
  setup(props) {
    const gaugeChartRef = ref(null);
    const results = ref([0, 0, 0]); // 初始化为 0

    let myChart = null;

    onMounted(() => {
      // 在组件加载完毕时初始化图表
      myChart = echarts.init(gaugeChartRef.value);
      // 设置图表的初始配置
      myChart.setOption({
        tooltip: { formatter: "{a} <br/>{b} : {c}%" },
        series: [
          {
            name: "正确率",
            type: "gauge",
            detail: {
              valueAnimation: true,
              formatter: "{value}%",
              color: "inherit",
            },
            data: [{ value: 0 }], // 初始值设置为 0
            axisLine: {
              lineStyle: {
                color: [
                  [0.2, "#f6416c"],
                  [0.8, "#ffd460"],
                  [1, "#78D700"],
                ],
                width: 10,
              },
            },
            itemStyle: { color: "#4B69FF" },
          },
        ],
      });
    });
    

    // 监听 results 的变化并更新图表
    watch(
      results,
      (newResults) => {
        const total = newResults[0];
        const correct = newResults[1];
        const correctRate = (total > 0 ? (correct / total) * 100 : 0).toFixed(
          2
        );

        if (myChart) {
          myChart.setOption({
            series: [
              {
                data: [{ value: correctRate }],
              },
            ],
          });
        }
      },
      { immediate: true }
    );

    const beginTest = () => {
      // 判断三角形
      if (props.titleKey == 0){
        const testResult = triangleTest();
        results.value = [testResult.total, testResult.count, testResult.duration];
      }
      else if (props.titleKey == 1){
        const testResult = calendarTest();
        results.value = [testResult.total, testResult.count, testResult.duration];
      }
      else if (props.titleKey == 2){
        const testResult = computerTest();
        results.value = [testResult.total, testResult.count, testResult.duration];
      }
    };

    return {
      gaugeChartRef,
      beginTest,
      results,
    };
  },
};
</script>
