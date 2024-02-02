import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
// 国际化配置
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
// import SvgIcon from '@/components/SvgIcon/index.vue'
import SvgIcon from '@/components'
import '@/styles/index.scss'
import router from '@/router'
import pinia from '@/store'

import './permission.ts'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(ElementPlus, {
  locale,
})
// 注册全局SvgIcon组件
// app.component('SvgIcon', SvgIcon)
console.log('env', import.meta.env) //获取开发环境
app.use(SvgIcon) //使用自定义插件
app.use(router)
app.use(pinia)
app.mount('#app')
// createApp(App).mount('#app').use(ElementPlus)
