// 用户相关仓库
import { defineStore } from 'pinia'
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes.ts'
import { UserLoginRequest } from '@/api/user/interface.ts'
import { getUserInfo, userLogin } from '@/api/user'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token.ts'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { cloneDeep } from 'lodash'

// 过滤异步路由
const filterAsyncRoute = (asyncRoute: any, routes: any) => {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}
const userStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN(), //用户的唯一标识符
      userInfo: {},
      menuRoutes: constantRoute, //仓库存储生成菜单的路由
      buttons: [],
    }
  },
  actions: {
    // 用户登录
    async userLogin(data: UserLoginRequest) {
      const res = await userLogin(data)
      if (res.code === 200 && res.data) {
        SET_TOKEN(res.data)
        this.token = res.data
        return 'pass'
      } else {
        return 'error'
      }
    },
    // 存储用户信息
    async setUserInfo() {
      const res = await getUserInfo()
      if (res.code === 200 && res.data) {
        this.userInfo = res.data
        // console.log('存储', res.data.routes)
        const userRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          res.data.routes
        )
        this.buttons = res.data.buttons || []
        this.menuRoutes = [...constantRoute, ...userRoute, anyRoute]
        // 注册路由
        const arr = [...userRoute, anyRoute]
        arr.forEach((item: any) => {
          router.addRoute(item)
        })
      } else {
        ElMessage.error(res.message)
      }
    },
    userLogOut() {
      this.userInfo = {}
      this.token = ''
      this.menuRoutes = []
      this.buttons = []
    },
  },
  getters: {},
})
export default userStore
