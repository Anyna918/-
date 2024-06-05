// src/utils/triangle.js
import { useDataStore } from "@/store/dataStore.js";

export function triangleTest(){
  const startTime = performance.now(); // 记录开始时间
  // 正确数量
  var count = 0;
  // 创建数据实例
  const dataStore = useDataStore();
  const total = dataStore.dataSource.length;

  // 遍历数据
  dataStore.dataSource.forEach((row) => {
    // 测试通过
    if (checkTriangleType(row.a, row.b, row.c) == row.result) {
      count++;
      row.status = 'pass';
    }
    // 测试未通过
    else{
      row.status = 'failure';
    }
  });  
  const endTime = performance.now(); // 记录结束时间
  const duration = endTime - startTime; // 计算持续时间，单位为ms
  console.log(`Count: ${count}`);
  console.log(`Test duration: ${duration.toFixed(3)}ms`);

  return {
    total: total,
    count: count,
    duration: parseFloat(duration.toFixed(3)) // 返回时间为数值类型，单位为ms
  };
}

export function checkTriangleType(a, b, c) {
  if (!(1<=a && a<=100) || !(1<=b && b<=100) || !(1<=c && c<=100))
    return "无效输入";
  if (a + b > c && a + c > b && b + c > a) {
    if (a === b && b === c) {
      return "等边三角形"; // 等边三角形
    } else if (a === b || b === c || a === c) {
      return "等腰三角形"; // 等腰三角形
    } else {
      return "普通三角形"; // 普通三角形
    }
  } else {
    return "非三角形"; // 不是三角形
  }
}
