import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import './assets/css/base.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
// 挂载全局
import echarts from '@/Plugin/echarts'
app.config.globalProperties.$echarts = echarts;
// app.provide('echarts',echarts)

// import ElementPlus from 'element-plus';
// import locale from "element-plus/lib/locale/lang/zh-cn";
// app.use(ElementPlus, {locale});

app.use(router).mount('#app')
