<template>
  <el-row>
    <el-col :span="1">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#1C1D22"
        class="el-menu-vertical-demo"
        default-active="3"
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
        <div class="project">
          <el-dropdown @command="handleProjectSelect">
            <el-button type="primary" style="width: 200px; margin-top: 50px">
              项目列表
            </el-button>
            <template #dropdown>
              <el-dropdown-menu style="max-height: 300px; width: 150px">
                <el-dropdown-item
                  v-for="project in projects"
                  :key="project.id"
                  :command="project.id.toString()"
                >
                  {{ project.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
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
          <el-menu-item index="1">项目描述</el-menu-item>
          <el-menu-item index="2">仪表盘</el-menu-item>
          <el-menu-item index="3">测试用例</el-menu-item>
        </el-menu>

        <ProjectDesc v-if="activeIndex === '1'" :projectKey="selectedProject" />
        <DashBoard v-else-if="activeIndex === '2'" />
        <DataTable v-else />
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.projecct {
}
</style>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import DashBoard from "../components/dashBoard.vue";
import DataTable from "../components/dataTable.vue";
import ProjectDesc from "../components/projectDesc.vue";

export default {
  name: "HomeView",
  components: {
    DashBoard,
    DataTable,
    ProjectDesc,
  },
  setup() {
    const activeIndex = ref("1");
    const expandedKeys = ref(["1"]);
    const selectedKeys = ref([1]);

    const handleSelect = (index, indexPath) => {
      activeIndex.value = index;
    };

    // 项目模拟
    const selectedProject = ref("0");
    const projects = ref([
      { id: 1, name: "健康助手" },
      { id: 2, name: "学习平台" },
      { id: 3, name: "库存管理" },
      { id: 4, name: "房产交易" },
      { id: 5, name: "旅游指南" },
      { id: 6, name: "美食广场" },
      { id: 7, name: "在线书店" },
      { id: 8, name: "票务系统" },
      { id: 9, name: "人事管理" },
      { id: 10, name: "财务分析" },
    ]);
    const handleProjectSelect = (projectId) => {
      // 确保 projectId 是数字类型
      const numericId = Number(projectId);
      selectedProject.value = projects.value.find((p) => p.id === numericId).id-1;
    };

    const router = useRouter();
    const handleJumpTo = (index) => {
      switch (index) {
        case "2":
          router.push({ name: "home" });
          break;
        case "3":
          router.push({ name: "unit" });
          break;
      }
    };
    return {
      activeIndex,
      handleSelect,
      selectedKeys,
      handleJumpTo,
      selectedProject,
      projects,
      handleProjectSelect,
    };
  },
};
</script>
