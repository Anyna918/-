<template>
  <div class="container">
    <div class="area_left">
      <div class="content">
        <p style="font-size: 18px; font-weight: bold">
          Question: {{ content[titleKey].title }}
        </p>
        <p class="sub_title">算法思想</p>
        <p class="formatted-description">{{ content[titleKey].des }}</p>
      </div>
      <div class="code">
        <p style="font-weight: bold">代码示例</p>
        <pre><code class="language-js">{{ code }}</code></pre>
      </div>
    </div>
    <div class="area_right">
      <div style="margin-top: 20px">
        <p>测试用例</p>
        <el-cascader
          v-model="selectedValue"
          :options="content[titleKey].options"
          :show-all-levels="false"
          placeholder="测试方法"
        />
      </div>
      <div class="hint">
        <el-popover
          placement="top-start"
          title="提示"
          :width="200"
          trigger="hover"
          content="1.需要包含“result”字段"
        >
          <template #reference>
            <p style="font-size: 12px;">! 自定义数据集要求</p>
          </template>
        </el-popover>
        <el-button type="primary" @click="inputTestData">导入测试集</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}
.area_left {
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 10px;
  height: 80vh;
  width: 65%;
  background-color: #24262c;
}
.area_right {
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  width: 35%;
  background-color: #24262c;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sub_title {
  font-weight: bold;
}
.content {
  width: 95%;
  margin-top: 20px;
  margin-left: 20px;
  text-align: left;
}
.formatted-description {
  white-space: pre-wrap; /* 保留换行和空白符，并正常换行 */
}
pre {
  max-height: 300px; /* 限制最大高度 */
  overflow-y: auto; /* 超出部分显示滚动条 */
  width: 100%; /* 确保宽度填满容器 */
}
pre::-webkit-scrollbar {
  display: none; /* 对于支持WebKit的浏览器隐藏滚动条 */
}
.code {
  position: absolute;
  bottom: 20px;
  width: 46%;
  margin-left: 10px;
  text-align: left;
}
.hint{
  position: absolute;
  bottom: 50px;
}
</style>

<script setup>
import { onMounted, ref } from "vue";
import Prism from "prismjs";
import "prismjs/themes/prism-duotone-dark.css";
import { useDataStore } from "@/store/dataStore.js";

const props = defineProps({
  titleKey: Number
})

// 练习题数据
const content = ref([
  {
    title: "判断三角形",
    des: `本题输入变量有 a, b, c 三个，首先判断其两边之和是否大于第三边，若大于则判断可以构成三角形，再进一步判断该三角形是什么三角形；否则不能构成三角形。
    1.从键盘输入三角形的三条边；
    2.判断两边之和是否大于第三边；
    3.继续判断三角形类型；
    4.首先判断其是否三边相等，条件成立则判断其为等边三角形；否则判断其是否有两边相等，条件成立则判断其为等腰三角形；否则判断其为普通三角形。`,
    options: [
      {
        value: "edge",
        label: "边界值",
      },
      {
        value: "equal",
        label: "等价类",
      },
    ],
  },
  {
    title: "万年历",
    des: `本问题输入变量为年份、月份、日期三个，首先需要对输入的日期进行合法性判断，确定输入日期符合规范后再进行计算下一天的日期。
    1. 首先判断年份是否符合取值范围（1900 ≤ year ≤ 2100）；
    2. 再判断月份是否符合取值范围（1 ≤ month ≤ 12）；
    3. 计算该年份下该月的天数 maxDays，然后判断输入日期是否符合取值范围（1 ≤ day ≤ maxDays）；
    4. 计算下一天的日期，尤其是当出现跨月份、跨年时需要给出正确的日期。`,
    options: [
      {
        value: "edge",
        label: "边界值",
      },
      {
        value: "equal",
        label: "等价类",
      },
      {
        value: "decision",
        label: "决策表"
      }
    ],
  },
  {
    title: "电脑销售系统",
    des: `最开始需要判断的是主机的销售数量，当这个变量值为 -1 时是对系统发出进行月度统计的指令，当值不为 -1 时才继续进行如下计算：
    1. 因为每月至少销售出一台整机，首先判断各配件的销售数量是否大于 1；
    2. 分别判断各配件是否销售数量超过各自的最大数量；
    3. 若条件 1、2 均成立，可进行销售额计算；
    4. 判断月度销售额在哪个佣金分段，在不同分段获得不同的佣金比例，计算出最终获得的佣金金额。`,
    options: [
      {
        value: "edge",
        label: "边界值",
      },
      {
        value: "equal",
        label: "等价类",
      },
      {
        value: "decision",
        label: "决策表"
      }
    ],
  },
  {
    title: "电信收费系统",
    des: `本问题输入变量为本月通话时间、用户本年度未按时缴费次数两个。
    1. 首先判断本月通话时长是否符合取值范围，通话时间应该 ≥0，且不能超过一个月的分钟数，这里为了方便直接使用 31*24*60 = 44640 作为最大值；
    2. 之后还需要判断用户本年度未按时缴费次数是否符合取值范围，显然次数应该 ≥0，同时在本月之前本年度最多有 11 个月缴费，所以未按时缴费次数 ≤11；
    3. 计算用户本月的通话时长处于哪一个折扣等级；
    4. 计算用户本年度未按时缴费次数是否超出当前折扣等级容许的未按时缴费次数；
    5. 通过折后费用加上月租费计算出最终的本月通话费用。`,
    options: [
      {
        value: "edge",
        label: "边界值",
      },
      {
        value: "equal",
        label: "等价类",
      },
      {
        value: "decision",
        label: "决策表"
      }
    ],
  }
]);

// 示例代码
const code = ref(`function isTriangle(a, b, c) {
  if (a + b > c && a + c > b && b + c > a) {
    if (a === b && b === c) {
      return 'Equilateral triangle'; // 等边三角形
    } else if (a === b || b === c || a === c) {
      return 'Isosceles triangle'; // 等腰三角形
    } else {
      return 'Scalene triangle'; // 不等边三角形
    }
  } else {
    return 'Not a triangle'; // 不是三角形
  }
}`);

// 选中的测试方法：
const selectedValue = ref("");
const dataStore = useDataStore();
// 导入选择好的测试方法
const inputTestData = () =>{
  // 三角形判断
  if (props.titleKey == 0){
    switch(selectedValue.value[0]){
      case 'edge':
        dataStore.fetchCsvFromPublic('triangle_1.csv');
        break;
      case 'equal':
        dataStore.fetchCsvFromPublic('triangle_2.csv');
        break;
    };
  }
}

onMounted(() => {
  Prism.highlightAll();
});
</script>
