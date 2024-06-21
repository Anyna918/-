// src/utils/computer.js
import { useDataStore } from "@/store/dataStore.js";

export function computerTest() {
  const startTime = performance.now(); // 记录开始时间
  // 正确数量
  var count = 0;
  // 创建数据实例
  const dataStore = useDataStore();
  const total = dataStore.dataSource.length;

  // 遍历数据
  dataStore.dataSource.forEach((row) => {
    // 测试通过
    if (computeAmount(row.host, row.display, row.peripheral) == row.result) {
      count++;
      row.status = "pass";
    }
    // 测试未通过
    else {
      row.status = "failure";
    }
  });
  const endTime = performance.now(); // 记录结束时间
  const duration = endTime - startTime; // 计算持续时间，单位为ms
  console.log(`Count: ${count}`);
  console.log(`Test duration: ${duration.toFixed(3)}ms`);

  return {
    total: total,
    count: count,
    duration: parseFloat(duration.toFixed(3)), // 返回时间为数值类型，单位为ms
  };
}

export function computeAmount(host, display, peripheral) {
  if (host == -1) {
    return "系统开始统计月度销售额";
  }
  if (host <= 0 || display <= 0 || peripheral <= 0) {
    return "数据非法";
  }
  if (host > 70) {
    return "数据非法";
  }
  if (display > 80) {
    return "数据非法";
  }
  if (peripheral > 90) {
    return "数据非法";
  }

  // 总金额
  const totalSales = host * 25 + display * 30 + peripheral * 45;
  if (totalSales <= 1000) {
    return String(totalSales * 0.1);
  } else if (totalSales <= 1800) {
    return String(totalSales * 0.15);
  } else {
    return String(totalSales * 0.2);
  }
}
