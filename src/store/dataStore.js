import { defineStore } from "pinia";
import { cloneDeep } from "lodash-es";
import Papa from "papaparse";
import { ElNotification } from "element-plus";

export const useDataStore = defineStore("data", {
  state: () => ({
    columns: [], // 测试用例标题
    dataSource: [], // 测试用例数据
    editableData: {}, // 临时数据表
    count: 0, // 主键
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
        newData.status = 'test';
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
          width: `${100 / (width + 2)}%`,
        }));
        this.columns.push({
          title: 'status',
          dataIndex: 'status',
          editable: false,
          width: `${100 / (width + 2)}%`,
        })
        this.columns.push({
          title: "操作",
          dataIndex: "operation",
          editable: false,
          width: `${100 / (width + 2)}%`,
        });
        this.dataSource = data.slice(1).map((row, index) => {
          const rowData = {};
          data[0].forEach((header, i) => {
            rowData[header] = row[i];
          });
          rowData.status = 'failure' // 状态初始化为待测试
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
  },
});
