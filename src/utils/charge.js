// src/utils/calendar.js
import { useDataStore } from "@/store/dataStore.js";

export function chargeTest() {
  const startTime = performance.now(); // 记录开始时间
  // 正确数量
  var count = 0;
  // 创建数据实例
  const dataStore = useDataStore();
  const total = dataStore.dataSource.length;

  // 遍历数据
  dataStore.dataSource.forEach((row) => {
    // 测试通过
    if (charge(row.talkingTime, row.unpaid) == row.result) {
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

export function charge(talkingTime, unpaidCount) {
  const basic = 25; // 每月基本月租费用25元
  const price = 0.15; // 每分钟通话费0.15元

  if (talkingTime < 0 || talkingTime > 31 * 24 * 60) {
    return "通话时长数值非法";
  }
  if (unpaidCount < 0 || unpaidCount > 11) {
    return "未按时缴费次数非法";
  }

  const maxUnpaid = [1, 2, 3, 3, 6];
  const level = getDiscount(talkingTime);
  if (count <= maxNum[level]) {
    return (
      Math.round((basic + price * talkingTime * (1 - (level + 2) * 0.005))));
  } else {
    return (Math.round((basic + price * talkingTime)));
  }
}

function getDiscount(time){
  if (time > 0 && time <= 60) return 0;
  else if (time > 60 && time <= 120) return 1;
  else if (time > 120 && time <= 180) return 2;
  else if (time > 180 && time <= 300) return 3;
  else return 4;
}
