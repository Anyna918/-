<template>
  <el-row>
    <el-col :span="1">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#1C1D22"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @select="handleJumpTo"
      >
        <el-menu-item index="1">
          <img src="@/assets/my_logo.png" alt="Menu Icon" class="logo" />
        </el-menu-item>
        <el-menu-item index="2">
          <el-tooltip effect="dark" content="练习题" placement="right">
            <img src="@/assets/navi_1.png" alt="Menu Icon" class="navi" />
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="3">
          <el-tooltip effect="dark" content="单元测试" placement="right">
            <img src="@/assets/navi_2.png" alt="Menu Icon" class="navi" />
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="4">
          <el-tooltip effect="dark" content="集成测试" placement="right">
            <img src="@/assets/navi_3.png" alt="Menu Icon" class="navi" />
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="5">
          <el-tooltip effect="dark" content="系统测试" placement="right">
            <img src="@/assets/navi_4.png" alt="Menu Icon" class="navi" />
          </el-tooltip>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="5">
      <div class="col_2">
        <p class="title">练习题</p>
        <a-tree
          v-model:expandedKeys="expandedKeys"
          v-model:selectedKeys="selectedKeys"
          :show-line="{ showLeafIcon: false }"
          :tree-data="treeData"
          class="tree"
        >
        </a-tree>
      </div>
    </el-col>
    <el-col :span="18">
      <div class="col_3">
        <div class="header">
          <el-avatar
            :size="32"
            class="mr-3"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <span style="margin-left: 10px">欢迎回来，雨昕👏🏻</span>
        </div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-horizontal-demo"
          mode="horizontal"
          background-color="#2a2b2f"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
        >
          <el-menu-item index="1">问题描述</el-menu-item>
          <el-menu-item index="2">仪表盘</el-menu-item>
          <el-menu-item index="3">测试用例</el-menu-item>
        </el-menu>

        <Description v-if="activeIndex === '1'" :titleKey="selectedKeys[0]-1"/>
        <DashBoard v-else-if="activeIndex === '2'" :testType="1" :titleKey="selectedKeys[0]-1"/>
        <DataTable v-else />
      </div>
    </el-col>
  </el-row>
</template>

<style>
.col_2 {
  height: 100vh;
  color: aliceblue;
  background-color: #222327;
  display: flex;
  flex-direction: column;
}
.col_3 {
  height: 100vh;
  color: aliceblue;
  background-color: #2a2b2f;
}
.el-menu-vertical-demo,
.el-menu-item {
  height: 100vh; /* 设置菜单的高度为视口高度 */
  border: none !important;
  margin: 0 !important;
  box-shadow: none !important;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.el-menu-vertical-demo .el-menu-item.is-active {
  position: relative;
}
.el-menu-vertical-demo .el-menu-item.is-active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px; /* 下划线高度 */
  width: 100%; /* 下划线宽度 */
  background-color: #ffd04b; /* 下划线颜色 */
}
.el-menu-horizontal-demo {
  border: none !important;
  margin: 0 !important;
  box-shadow: none !important;
}
.el-menu-horizontal-demo {
  position: relative;
}
.el-menu-horizontal-demo .el-menu-item.is-active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px; /* 下划线高度 */
  width: 100%; /* 下划线宽度 */
  background-color: #ffd04b; /* 下划线颜色 */
}
.logo {
  margin-top: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 30px;
}
.navi {
  margin-top: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 20px;
}
.tree {
  position: absolute;
  margin-top: 80px;
  margin-left: 20px;
  background-color: #222327 !important;
  color: rgb(255, 255, 255);
  font-size: 16px;
}
.tree .ant-tree-treenode-selected > .ant-tree-node-content-wrapper {
  background-color: #0b419d !important; /* 替换为你希望的颜色 */
}
.header {
  height: 8vh;
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.title {
  font-size: 22px;
  margin-right: auto;
  margin-left: 20px;
  margin-top: 20px;
}
</style>

<script>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import DashBoard from "../components/dashBoard.vue";
import DataTable from "../components/dataTable.vue";
import Description from "../components/description.vue";

export default {
  name: "HomeView",
  components: {
    DashBoard,
    DataTable,
    Description,
  },
  setup() {
    const activeIndex = ref("1");
    const expandedKeys = ref(["1"]);
    const selectedKeys = ref([1]);
    console.log("Selected keys:", selectedKeys.value);
    const treeData = [
      {
        title: "题目",
        key: "0",
        children: [
          {
            title: "判断三角形",
            key: "1",
          },
          {
            title: "万年历",
            key: "2",
          },
          {
            title: "电脑销售系统",
            key: "3",
          },
          {
            title:"电信收费系统",
            key:"4"
          }
        ],
      },
    ];
    const handleSelect = (index, indexPath) => {
      activeIndex.value = index;
    };

    const router = useRouter()
    const handleJumpTo = (index) => {
      switch (index) {
        case '2':
          router.push({ name: 'home' });
          break;
        case '3':
          router.push({ name: 'unit' });
          break;
        case '4':
          router.push({ name: 'inte' });
          break;
      }
    };

    return { treeData, activeIndex, handleSelect, selectedKeys, handleJumpTo };
  },
};
</script>
