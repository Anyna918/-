// src/api/axios.js
import axios from 'axios';

// 创建一个 Axios 实例
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // 后端地址
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // 可以在这里添加授权 token 等
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 处理响应错误
    if (error.response && error.response.status === 401) {
      // 未授权，重定向到登录页面等
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;