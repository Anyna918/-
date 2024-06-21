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
            <el-button type="primary" style="width: 150px">
              项目列表
            </el-button>
            <template #dropdown>
              <el-dropdown-menu style="max-height: 300px; width: 150px">
                <el-dropdown-item
                  v-for="project in data.projects"
                  :key="project.id"
                  :command="project.id.toString()"
                >
                  {{ project.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button
            type="primary"
            :icon="Edit"
            circle
            @Click="openFormDialog"
          />
          <el-dialog
            title="创建项目"
            v-model="isDialogVisible"
            width="30%"
            style="border-radius: 10px; margin-top: 30vh"
          >
            <el-form>
              <el-form-item label="名称">
                <el-input v-model="formData.name"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="formData.desc" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="URL">
                <el-input v-model="formData.url"></el-input>
              </el-form-item>
              <el-form-item label="StackBlitz">
                <el-input v-model="formData.url"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="isDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="submitFormData">提交</el-button>
            </span>
          </el-dialog>
          <el-button
            type="primary"
            :icon="Connection"
            circle
            @Click="addProjectClass"
          />
          <el-button
            type="success"
            :icon="Cpu"
            circle
            @Click="addClassFunction"
          />
        </div>
        <div class="backendClass">
          <a-tree
            v-if="isTreeVisible"
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            :show-line="{ showLeafIcon: false }"
            :tree-data="data.projects[selectedProject].backendClasses"
            class="tree"
          >
          </a-tree>
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

        <ProjectDesc
          v-if="activeIndex === '1'"
          :projectName="data.projects[selectedProject].name"
          :projectDesc="data.projects[selectedProject].desc"
          :projectUrl="data.projects[selectedProject].url"
          :stackUrl="data.projects[selectedProject].stackUrl"
        />
        <DashBoard v-else-if="activeIndex === '2'" :testType="2" />
        <DataTable v-else :functionName="functionName" />
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.project {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 50px;
  gap: 10px;
  height: 200px;
}
.backendClass {
  margin-top: 150px;
  margin-left: 60px;
  display: flex;
  flex-direction: row;
}
</style>

<script>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import DashBoard from "../components/dashBoard.vue";
import DataTable from "../components/dataTable.vue";
import ProjectDesc from "../components/projectDesc.vue";
import { useProjectStore } from "@/store/projectStore.js";
import { Edit, Connection, Cpu } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "UnitView",
  components: {
    DashBoard,
    DataTable,
    ProjectDesc,
  },
  setup() {
    const activeIndex = ref("1");
    const expandedKeys = ref(["1"]);
    const selectedKeys = ref([1]);
    const functionName = ref("");

    const handleSelect = (index, indexPath) => {
      activeIndex.value = index;
    };

    // 项目模拟
    const data = useProjectStore();
    const selectedProject = ref("0");
    const handleProjectSelect = (projectId) => {
      // 确保 projectId 是数字类型
      const numericId = Number(projectId);
      selectedProject.value =
        data.projects.find((p) => p.id === numericId).id - 1;
    };

    // 监听 selectedKeys 的变化
    watch(selectedKeys, (newValue, oldValue) => {
      console.log("selectedKeys 发生变化: ", newValue, oldValue);
      functionName.value = data.findFunctionName(parseInt(selectedProject.value) + 1, selectedKeys.value[0]);
      console.log('函数名称', functionName.value);
    });

    const router = useRouter();
    const handleJumpTo = (index) => {
      switch (index) {
        case "2":
          router.push({ name: "home" });
          break;
        case "3":
          router.push({ name: "unit" });
          break;
        case "4":
          router.push({ name: "inte" });
          break;
      }
    };

    const isDialogVisible = ref(false);
    const formData = ref({
      name: "",
      desc: "",
      url: "",
      stackUrl: "",
    });

    const openFormDialog = () => {
      isDialogVisible.value = true;
    };

    // 添加项目
    const submitFormData = () => {
      isDialogVisible.value = false;
      data.addProject(
        formData.value.name,
        formData.value.desc,
        formData.value.url,
        formData.value.stackUrl
      );
    };

    // 是否含有后端类
    const selectedBackendClasses = computed(() => {
      const project = data.projects[selectedProject.value];
      return project ? project.backendClasses : [];
    });
    const isTreeVisible = computed(() => {
      const backendClasses = selectedBackendClasses.value;
      return (
        backendClasses &&
        backendClasses.length > 0 &&
        backendClasses[0].children.length > 0
      );
    });

    // 添加类
    const addProjectClass = () => {
      console.log(selectedKeys.value);
      ElMessageBox.prompt("请输入类名称", "添加", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        inputValidator: (value) => {
          if (!value) {
            return "请输入有效名称"; // 提示输入不能为空
          }
          return true; // 输入非空则通过
        },
      })
        .then(({ value }) => {
          data.addBackendClassToProject(
            parseInt(selectedProject.value) + 1,
            value
          );
          // data.addFunctionToClass(parseInt(selectedProject.value)+1, parseInt(selectedKeys.value), value)
          ElMessage({
            type: "success",
            message: `添加成功`,
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消添加",
          });
        });
    };

    // 添加函数
    const addClassFunction = () => {
      ElMessageBox.prompt("请输入函数名称", "添加", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        inputValidator: (value) => {
          if (!value) {
            return "请输入有效名称"; // 提示输入不能为空
          }
          return true; // 输入非空则通过
        },
      })
        .then(({ value }) => {
          data.addFunctionToClass(
            parseInt(selectedProject.value) + 1,
            parseInt(selectedKeys.value),
            value
          );
          ElMessage({
            type: "success",
            message: `添加成功`,
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消添加",
          });
        });
    };

    return {
      activeIndex,
      handleSelect,
      selectedKeys,
      handleJumpTo,
      selectedProject,
      handleProjectSelect,
      data,
      Edit,
      Cpu,
      addProjectClass,
      addClassFunction,
      isDialogVisible,
      formData,
      openFormDialog,
      submitFormData,
      Connection,
      isTreeVisible,
      functionName
    };
  },
};
</script>
