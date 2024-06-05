<template>
  <div class="container">
    <div style="font-size: 24px; margin-top: 20px">
      {{ projects[projectKey].name }}
    </div>
    <div class="description">{{ projects[projectKey].desc }}</div>
    <div class="iframe-container">
      <iframe :src="projects[projectKey].url" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #24262c;
  margin-top: 25px;
  margin-left: 2vw;
  height: 80vh;
  width: 71vw;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.description {
  margin-top: 20px;
  width: 50vw;
}
.iframe-container iframe {
  width: 68vw;    
  height:500px;
  margin-top: 15px;
  border-radius: 10px;      
}
</style>

<script setup>
const props = defineProps({
  projectKey: Number,
});

// 项目描述
const projects = [
    {
        id: 1,
        name: "健康助手",
        desc: "提供全面的健康管理服务，包括健康数据追踪、运动和饮食建议，以及健康趋势分析，帮助用户维持和提升健康水平。",
        url: "https://www.pingan.com"
    },
    {
        id: 2,
        name: "学习平台",
        desc: "在线教育平台，提供多样化的课程和资源，支持互动教学，促进学生和教师之间的互动，适合自我学习和远程教育需求。",
        url: "https://www.xuetangx.com"
    },
    {
        id: 3,
        name: "库存管理",
        desc: "为企业提供库存管理解决方案，包括自动库存跟踪、库存优化建议和预警系统，帮助企业降低成本并提高运营效率。",
        url: "https://www.kingdee.com"
    },
    {
        id: 4,
        name: "房产交易",
        desc: "房地产市场平台，提供买卖房产的广泛选择，包括最新市场趋势分析和价格监控，助力用户做出明智的投资决策。",
        url: "https://www.lianjia.com"
    },
    {
        id: 5,
        name: "旅游指南",
        desc: "提供国内外旅游景点推荐，详尽的旅行路线规划和实用旅行攻略，包括当地文化、美食和注意事项，是旅行者的实用伴侣。",
        url: "https://www.ctrip.com"
    },
    {
        id: 6,
        name: "美食广场",
        desc: "在线美食社区和预订平台，汇集各种美食餐厅和评价，提供实时餐位预订服务，是美食爱好者的首选网站。",
        url: "https://www.dianping.com"
    },
    {
        id: 7,
        name: "在线书店",
        desc: "数字化图书销售平台，提供各类图书、杂志和文献的购买与阅读服务，支持在线阅读和实体书购买，满足广泛的阅读需求。",
        url: "https://www.dangdang.com"
    },
    {
        id: 8,
        name: "票务系统",
        desc: "全面的在线票务系统，支持电影、演唱会、体育赛事等各类活动的票务预订，提供实时票务信息和便捷的在线支付服务。",
        url: "https://piaofang.maoyan.com/dashboard"
    },
    {
        id: 9,
        name: "人事管理",
        desc: "企业级人事管理系统，支持员工信息管理、薪酬福利、考勤排班和绩效评估，帮助企业优化人力资源管理流程。",
        url: "https://www.feishu.cn"
    },
    {
        id: 10,
        name: "财务分析",
        desc: "提供深度财务分析和报告服务，支持财务数据的收集、分析和可视化展示，帮助企业做出数据驱动的决策。",
        url: "https://www.yonyoucloud.com"
    }
];
</script>
