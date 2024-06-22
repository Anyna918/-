import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
/* 引入 ElementPlus */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
/*引入ant design*/
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
/*引入Pinia全局管理*/
import { createPinia } from 'pinia';

const pinia = createPinia();
// 根组件的挂载在ElementPlus之后
createApp(App).use(Antd).use(ElementPlus).use(router).use(pinia).mount("#app");

