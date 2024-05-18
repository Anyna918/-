<template>
  <div class="editable-add-btn">
    <a-button type="primary" @click="dataStore.handleAdd">手动添加</a-button>
    <a-upload
      :before-upload="dataStore.handleBeforeUpload"
      :showUploadList="false"
    >
      <a-button type="primary">导入</a-button>
    </a-upload>
  </div>
  <a-table
    :columns="dataStore.columns"
    :data-source="dataStore.dataSource"
    bordered
    class="table"
    :scroll="{ y: 300 }"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.editable">
        <div>
          <a-input
            v-if="dataStore.editableData[record.key]"
            v-model:value="dataStore.editableData[record.key][column.dataIndex]"
            style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'status'">
        <span v-if="getStatus(record) === 'test'" class="test">待测试</span>
        <span v-else-if="getStatus(record) === 'pass'" class="pass">已通过</span>
        <span v-else-if="getStatus(record) === 'failure'" class="failure">未通过</span>
      </template>

      <template v-else-if="column.dataIndex === 'operation'">
        <div class="operation">
          <span v-if="dataStore.editableData[record.key]">
            <a-typography-link @click="dataStore.save(record.key)"
              >Save
            </a-typography-link>
            <a-popconfirm
              title="确认取消?"
              @confirm="dataStore.cancel(record.key)"
            >
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="dataStore.edit(record.key)">Edit</a>
          </span>
          <a-popconfirm
            v-if="dataStore.dataSource.length"
            title="确定删除?"
            @confirm="dataStore.onDelete(record.key)"
          >
            <a> Delete</a>
          </a-popconfirm>
        </div>
      </template>
    </template>
  </a-table>
</template>

<style scoped>
/* 修改表格悬浮颜色 */
::v-deep .ant-table-tbody > tr.ant-table-row:hover > td {
  background-color: #f0f0f0 !important; /* 淡灰色 */
  color: #1890ff !important; /* 蓝色 */
}
/* 修改分页器颜色 */
::v-deep .ant-pagination-item-link,
::v-deep .ant-pagination-item {
  color: #ffffff !important;
}
.table {
  width: 70vw;
  margin-left: 30px;
  margin-top: 30px;
}
.editable-row-operations a {
  margin-right: 8px;
}
.editable-add-btn {
  width: 70vw;
  display: flex;
  flex-direction: flex-start;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 30px;
}
.test {
  color: #ffffff;
  background-color: #bababa;
  padding: 5px;
  border-radius: 5px;
}
.pass {
  color: #ffffff;
  background-color: #6fc507;
  padding: 5px;
  border-radius: 5px;
}
.failure {
  color: #ffffff;
  background-color: #d50000;
  padding: 5px;
  border-radius: 5px;
}
</style>

<script>
import { useDataStore } from "@/store/dataStore.js";
export default {
  name: "DataTable",
  setup() {
    const dataStore = useDataStore();
    const getStatus = (record) => {
      const item = dataStore.dataSource.find(item => item.key === record.key);
      console.log(`Rendering status for key: ${record.key}, status: ${item ? item.status : 'undefined'}`);
      return item && item.status;  // 确保 item 存在后再访问 status
    };
    return {
      dataStore,
      getStatus,
    };
  },
};
</script>
@/store/dataStore.js
