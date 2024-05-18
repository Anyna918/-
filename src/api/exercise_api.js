
import axios from './axios';

// 示例 API 请求函数
export const getUser = (userId) => {
  return axios.get(`/users/${userId}`);
};

export const createUser = (userData) => {
  return axios.post('/users', userData);
};

// 其他 API 请求函数