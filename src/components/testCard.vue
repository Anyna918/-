<template>
  <div class="container">
    <div class="content">
      {{ content[type].title }}
    </div>
    <div class="sub-title">
      {{ content[type].sub_title }}
    </div>
    <div class="detail">
      <div>
        {{ content[type].des }}
      </div>
      <div class="result">
        {{ result }}{{ content[type].unit }}
      </div>
    </div>
    <div class="line" :style="{ backgroundColor: content[type].color }"></div>
  </div>
</template>

<style>
.container {
  width: 300px;
  height: 150px;
  background-color: #24262c;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content {
  font-size: 16px;
  margin-left: 20px;
  margin-top: 20px;
  margin-right: auto;
}
.sub-title {
  font-size: 14px;
  margin-left: 20px;
  margin-top: 5px;
  margin-right: auto;
  color: rgba(255, 255, 255, 0.5);
}
.detail{
  width: 260px;
  font-size: 14px;
  margin-left: 20px;
  margin-top: 20px;
  margin-right: auto;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: flex-start;
}
.result {
  font-size: 16px;
  color: white;
  margin-left: auto;
}
.line {
  width: 260px;
  height: 5px;
  margin-top: auto;
  margin-bottom: 30px;
  border-radius: 10px;
}
</style>

<script>
export default {
  name: "TestCard",
  props: {
    type: Number,
    result: Number
  },
  setup() {
    const content = [
      {
        title: "测试用例数量",
        sub_title: "总测试用例",
        des: "Case",
        color: "#4B69FF",
        unit:""
      },
      {
        title: "测试通过",
        sub_title: "测试通过数量",
        des: "Correct",
        color: "#78D700",
        unit:""
      },
      {
        title: "测试时间",
        sub_title: "测试运行时间",
        des: "Time",
        color: "#FFA048",
        unit:" ms"
      },
    ];
    return { content };
  },
};
</script>
