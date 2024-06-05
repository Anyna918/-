// stores/projectStore.js
import { defineStore } from 'pinia';

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    projectName:  {}, // 项目名称
    nextProjectId: 1 // 追踪下一个项目的ID
  }),
  actions: {
    createProject(projectName) {
      // 使用当前 nextProjectId 作为新项目的 ID
      const projectId = this.nextProjectId;
      if (!this.projects[projectId]) {
        this.projects[projectId] = {
          id: projectId,
          name: projectName,
          des: '项目描述'
        };
        // 创建完项目后，自增 nextProjectId
        this.nextProjectId++;
      }
    },
    deleteProject(projectId) {
      if (this.projects[projectId]) {
        delete this.projects[projectId];
      }
    }
  }
});
