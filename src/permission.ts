// 路由鉴权文件
import router from '@/router'
import progress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/store'
import userStore from '@/store/modules/user.ts'
import { SYSTEM_NAME } from '@/systemConfig'
import { getUserInfo, userLogout } from '@/api/user'

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  console.log('切换路由')
  const useUserStore = userStore(pinia)
  const token = useUserStore.token
  const name = useUserStore.userInfo.name
  progress.start()
  progress.configure({ showSpinner: false })
  if (token) {
    // 登录不能去login重定向home
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (name) {
        next()
      } else {
        // 重新发送请求
        const res = await getUserInfo()
        if (res.code === 200) {
          useUserStore.setUserInfo(res.data) //存到pinia仓库
          next()
        } else {
          // token过期
          await userLogout()
          // 首先退出登录
          useUserStore.userLogOut()
          //手动篡改本地token
          next({ path: '/login' })
        }
      }
    }
  } else {
    // 用户未登录只能去login
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
// 全局后置守卫
router.afterEach((to: any, from: any, next: any) => {
  // 标题
  document.title = `${SYSTEM_NAME}-${to.meta.title}`
  progress.done()
})
