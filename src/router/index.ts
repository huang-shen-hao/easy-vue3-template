import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from '@/router/routes.ts'

const router = createRouter({
  history: createWebHashHistory(), //哈西模式
  routes: constantRoute,
  // 滚动条置顶
  scrollBehavior() {
    return {
      left: 0, //水平
      top: 0, //垂直
    }
  },
})
export default router
