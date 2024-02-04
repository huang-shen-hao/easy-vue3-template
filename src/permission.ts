// 路由鉴权文件
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/store'
import userStore from '@/store/modules/user.ts'
import { SYSTEM_NAME } from '@/systemConfig'
import { getUserInfo } from '@/api/user'

//路由白名单列表，把路由添加到这个数组，不用登陆也可以访问
const whiteList = ['/login']

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  const useUserStore = userStore(pinia)
  const hasToken = useUserStore.token
  const hasName = useUserStore.userInfo.name
  //NProgress 封装的进度
  NProgress.configure({ showSpinner: false })
  // 请求路由时进度条开始
  NProgress.start()
  if (hasToken) {
    if (to.path === '/login') {
      // 直接跳转到首页，路由重定向home
      next({ path: '/' })
      NProgress.done()
    } else {
      //如果已经有令牌的用户请求的不是登录页，是其他页面
      //就从Vuex里拿到用户的信息，这里也证明用户不是第一次登录了
      if (hasName) {
        //信息拿到后，用户请求哪就跳转哪
        next()
        NProgress.done()
      } else {
        // 重新发送请求
        const res = await getUserInfo()
        if (res.code === 200) {
          await useUserStore.setUserInfo() //存到pinia仓库
          // 确保异步路由组件加载完毕
          next({ ...to, replace: true })
          NProgress.done()
        }
      }
    }
  } else {
    //这里是没有令牌的情况
    //whiteList.indexOf(to.path) !== -1)判断用户请求的路由是否在白名单里
    if (whiteList.indexOf(to.path) !== -1) {
      // 不是-1就证明存在白名单里，不管你有没有令牌，都直接去到白名单路由对应的页面
      next()
      NProgress.done()
    } else {
      // 如果这个页面不在白名单里，直接跳转到登录页面
      next(`/login?redirect=${to.path}`)
      //关闭进度条
      NProgress.done()
    }
  }
})

// 全局后置守卫
router.afterEach((to: any, from: any, next: any) => {
  // 标题
  document.title = `${SYSTEM_NAME}-${to.meta.title}`
  NProgress.done()
})
