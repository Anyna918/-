import { defineStore } from "pinia";
import { cloneDeep } from "lodash-es";
import Papa from "papaparse";
import { ElNotification } from "element-plus";
import axios from "axios";

export const useDataStore = defineStore("data", {
  state: () => ({
    columns: [], // 测试用例标题
    dataSource: [], // 测试用例数据
    editableData: {}, // 临时数据表
    count: 0, // 主键
    function: "", // 函数名称
  }),
  actions: {
    // 编辑数据
    edit(key) {
      this.editableData[key] = cloneDeep(
        this.dataSource.find((item) => key === item.key)
      );
      console.log(key);
    },
    // 保存数据
    save(key) {
      Object.assign(
        this.dataSource.find((item) => key === item.key),
        this.editableData[key]
      );
      delete this.editableData[key];
    },
    // 取消编辑
    cancel(key) {
      delete this.editableData[key];
    },
    // 添加数据
    handleAdd() {
      if (this.columns.length == 0) {
        ElNotification({
          title: "添加失败",
          message: "请先导入测试数据",
        });
        console.log("error");
      } else {
        const newData = {};
        this.columns.forEach((column) => {
          if (column.title != "操作") newData[column.title] = "N/A";
        });
        newData.status = "test";
        newData.key = this.count;
        this.dataSource.push(newData);
        console.log(this.dataSource);
        // 保持主键自增
        this.count++;
      }
    },
    // 删除数据
    onDelete(key) {
      this.dataSource = this.dataSource.filter((item) => item.key !== key);
    },
    // 上传数据表
    handleBeforeUpload(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.parseCsv(e.target.result);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsText(file);
      return false; // 阻止自动上传逻辑
    },
    // 从public文件夹中读取CSV文件
    async fetchCsvFromPublic(filename) {
      try {
        const response = await axios.get(`/${filename}`);
        this.parseCsv(response.data);
        ElNotification({
          title: "读取成功",
          message: "数据已成功导入测试用例列表",
        });
      } catch (error) {
        console.error("Error fetching CSV file:", error);
        ElNotification({
          title: "读取失败",
          message: "无法从public文件夹中读取CSV文件",
        });
      }
    },
    // 解析csv
    parseCsv(csvData) {
      Papa.parse(csvData, {
        dynamicTyping: true,
        skipEmptyLines: true,
        encoding: "utf8",
        complete: (results) => {
          this.updateTable(results.data);
        },
      });
    },
    // 更新数据
    updateTable(data) {
      if (data.length > 0) {
        const width = data[0].length;
        this.columns = data[0].map((header, index) => ({
          title: header,
          dataIndex: header,
          key: header,
          editable: true,
          width: 120,
        }));
        this.columns.push({
          title: "status",
          dataIndex: "status",
          editable: false,
          width: 120,
        });
        this.columns.push({
          title: "操作",
          dataIndex: "operation",
          editable: false,
          width: 120,
        });
        this.dataSource = data.slice(1).map((row, index) => {
          const rowData = {};
          data[0].forEach((header, i) => {
            rowData[header] = row[i];
          });
          rowData.status = "test"; // 状态初始化为待测试
          rowData.key = index;
          return rowData;
        });
        this.count = this.dataSource.length;
        console.log(this.dataSource);
      }
    },
    // 恢复初始值
    reset() {
      this.columns = [];
      this.dataSource = [];
      this.editableData = {};
      this.count = 0;
    },

    uploadResults(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.parseAndUpdateStatus(e.target.result)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
        };
        reader.onerror = (error) => {
          console.error("Error reading file:", error);
          ElNotification({
            title: "文件读取错误",
            message: "无法读取上传的文件",
            type: "error",
          });
          reject(error);
        };
        reader.readAsText(file);
      });
    },
    // 解析上传的结果CSV并更新状态
    // 解析上传的结果CSV并更新状态
    parseAndUpdateStatus(csvData) {
      return new Promise((resolve, reject) => {
        Papa.parse(csvData, {
          dynamicTyping: true,
          skipEmptyLines: true,
          encoding: "utf8",
          complete: (results) => {
            try {
              const result = this.updateStatus(results.data);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    },

    // 根据上传的结果更新状态
    updateStatus(data) {
      var count = 0; // 通过个数
      const startTime = performance.now(); // 记录开始时间

      const idIndex = this.columns.findIndex((col) => col.title === "id"); // 确认 'id' 在列中的索引
      const statusIndex = this.columns.findIndex(
        (col) => col.title === "status"
      ); // 确认 'status' 在列中的索引
      const functionIndex = this.columns.findIndex(
        (col) => col.title === "function"
      ); // 确认 'Function' 在列中的索引

      if (
        idIndex !== -1 &&
        statusIndex !== -1 &&
        functionIndex !== -1 &&
        data.length > 0
      ) {
        data.forEach((row) => {
          const id = row[idIndex];
          const status = row[statusIndex];
          const functionValue = row[functionIndex];

          const item = this.dataSource.find((item) => item.id === id); // 使用 'id' 属性寻找对应的测试用例
          if (item) {
            console.log("item", item, "status", status);
            if (functionValue == item.function) {
              if (status == true) {
                item.status = "pass";
                count++;
              } else if (status == false) item.status = "failure";
            }
          }
        });

        const endTime = performance.now(); // 记录结束时间
        const duration = endTime - startTime; // 计算持续时间，单位为ms

        ElNotification({
          title: "状态更新成功",
          message: "所有相关的测试用例状态已更新",
          type: "success",
        });

        return {
          total: this.dataSource.length,
          count: count,
          duration: parseFloat(duration.toFixed(3)), // 返回时间为数值类型，单位为ms
        };
      } else {
        ElNotification({
          title: "错误",
          message: "CSV格式不正确或缺少必要的列",
          type: "error",
        });

        return {
          total: 0,
          count: 0,
          duration: 0,
        };
      }
    },
  },
});
