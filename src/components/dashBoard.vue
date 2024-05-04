<template>
  <a-button type="primary" >开始测试</a-button>
  <div class="card">
    <TestCard :type="0" :result="result[0]" />
    <TestCard :type="1" :result="result[1]" />
    <TestCard :type="2" :result="result[2]" />
  </div>
  <div ref="gaugeChartRef" class="chart"></div>
  <div>✅ Accuracy</div>
  
</template>

<style>
.card {
  display: flex;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  justify-content: space-between;
}
.chart{
    width:350px;    
    height: 350px;
    border-radius: 10px;
    margin: auto;
}

</style>

<script>
import TestCard from "../components/testCard.vue";

import { ref, onMounted } from 'vue';
import * as echarts from "echarts/core";
import { GaugeChart } from "echarts/charts";
import { TitleComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GaugeChart, TitleComponent, TooltipComponent, CanvasRenderer]);

export default {
  name: "DashBoard",
  components: {
    TestCard,
  },
  props: {
    result: Array,
  },
  setup(props) {
    const gaugeChartRef = ref(null);

    onMounted(() => {
      const myChart = echarts.init(gaugeChartRef.value);
      const total = props.result[0];
      const correct = props.result[1];
      const correctRate = (total > 0 ? (correct / total) * 100 : 0).toFixed(2);

      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: '正确率',
            type: 'gauge',
            detail: { valueAnimation: true,formatter: '{value}%',color:'inherit' },
            data: [{ value: correctRate}],
            axisLine: {            // 坐标轴线
                lineStyle: {         // 属性lineStyle控制线条样式
                color: [[0.2, '#f6416c'], [0.8, '#ffd460'], [1, '#78D700']],
                width: 10
                }
            },
            itemStyle: {
                color: '#4B69FF'    // 指针颜色
            }
          }
        ]
      };

      myChart.setOption(option);
    });

    return {
      gaugeChartRef,
    };
  }
};
</script>