// store/projectStore.js
import { defineStore } from "pinia";

export const useProjectStore = defineStore("projects", {
  state: () => ({
    projects: [
      {
        id: 1,
        name: "健康助手",
        desc: "提供全面的健康管理服务，包括健康数据追踪、运动和饮食建议，以及健康趋势分析，帮助用户维持和提升健康水平。",
        url: "https://apifox.com/",
        stackUrl:'https://stackblitz.com/~/github.com/Anyna918/FlippedKitchen?file=src/main.js',
        backendClasses: [{
          title: "后端类",
          key: "0",
          children: [
            {
              title:'类1',
              key: '1'
            },
            {
              title:'类2',
              key: '2'
            }
          ]
        }]
      },
      {
        id: 2,
        name: "学习平台",
        desc: "在线教育平台，提供多样化的课程和资源，支持互动教学，促进学生和教师之间的互动，适合自我学习和远程教育需求。",
        url: "https://www.xuetangx.com",
        stackUrl:'https://stackblitz.com/~/github.com/Anyna918/FlippedKitchen?file=src/main.js',
        backendClasses: [{
          title: "后端类",
          key: "0",
          children: [
            {
              title:'class_1',
              key: '1'
            },
            {
              title:'class_2',
              key: '2'
            }
          ]
        }]
      },
    ],
    lastId: 2  // 初始值为当前最大的id
  }),
  actions: {
    // 添加项目
    addProject(name, desc, url, stack) {
      this.lastId++;
      const newProject = {
        name: name,
        desc: desc,
        url: url,
        stackUrl:stack,
        id: this.lastId,
        backendClasses: [{
          title: "后端类",
          key: "0",
          children: []
        }]
      };
      console.log("new", newProject)
      this.projects.push(newProject);
    },
    // 删除项目
    removeProject(id) {
      this.projects = this.projects.filter((project) => project.id !== id);
    },
    // 更新项目信息
    updateProject(id, newDetails) {
      const index = this.projects.findIndex((project) => project.id === id);
      if (index !== -1) {
        this.projects[index] = { ...this.projects[index], ...newDetails };
      }
    },
    addBackendClassToProject(projectId, classTitle) {
      console.log("Adding class to project:", projectId, classTitle);
      const project = this.projects.find(project => project.id === projectId);
      if (project) {
        console.log("Found project:", project);
        const backendClasses = project.backendClasses;
        if (backendClasses && backendClasses.length > 0) {
          const newKey = backendClasses[0].children.length + 1;
          console.log("newkey", newKey)
          backendClasses[0].children.push({
            title: classTitle,
            key: newKey
          });
          console.log("Added new backend class:", backendClasses[0].children);
        } else {
          console.error("Backend classes are not properly defined:", backendClasses);
        }
      } else {
        console.error("Project not found with id:", projectId);
      }
    },
  },
});
