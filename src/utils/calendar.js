// src/utils/calendar.js
import { useDataStore } from "@/store/dataStore.js";

export function calendarTest() {
  const startTime = performance.now(); // 记录开始时间
  // 正确数量
  var count = 0;
  // 创建数据实例
  const dataStore = useDataStore();
  const total = dataStore.dataSource.length;

  // 遍历数据
  dataStore.dataSource.forEach((row) => {
    // 测试通过
    if (judgeCalendar(row.year, row.month, row.day) == row.result) {
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

export function judgeCalendar(year, month, day) {
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 每个月份的天数
  let isLeap = 0; // 闰年标识

  if (year % 400 == 0) { // 判断是否为闰年
    isLeap = 1;
  } else if (year % 100 != 0 && year % 4 == 0) {
    isLeap = 1;
  }

  monthDays[1] += isLeap;
  const maxDays = monthDays[month - 1];
  const result = [year, month, day + 1];

  if (year < 1800 || year > 2000) {
    // 年份越界
    return "-1";
  }
  if (month <= 0 || month > 12) {
    // 月份越界
    return "-1";
  }
  if (day <= 0 || day > maxDays) {
    // 天数越界
    return "-1";
  }

  // 满足条件后，求解下一天的日期
  if (day == maxDays) {
    result[2] = 1;
    result[1]++;
  }
  if (result[1] > 12) {
    result[1] = 1;
    result[0]++;
  }

  return result[0] + "-" + result[1] + "-" + result[2];
}
