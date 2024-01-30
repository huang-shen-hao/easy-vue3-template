import { type App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'
// 全局引入element - plus的icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 项目全部的全局组件
const allGlobalComponent = { SvgIcon }
/**
 * Svg图标插件
 */
export default {
  install: (app: App): void => {
    Object.keys(allGlobalComponent).forEach((key: string) => {
      app.component(key, allGlobalComponent[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    console.log('执行install', ElementPlusIconsVue)
  },
}
