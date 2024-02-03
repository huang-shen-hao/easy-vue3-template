// 用户相关仓库
import { defineStore } from 'pinia'
import { constantRoute } from '@/router/routes.ts'
import { userInfoType, UserLoginRequest } from '@/api/user/interface.ts'
import { userLogin } from '@/api/user'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token.ts'
const userStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN(), //用户的唯一标识符
      userInfo: {},
      menuRoutes: constantRoute, //仓库存储生成菜单的路由
      isLogin: false,
    }
  },
  actions: {
    // 用户登录
    async userLogin(data: UserLoginRequest) {
      const res = await userLogin(data)
      if (res.code === 200 && res.data) {
        SET_TOKEN(res.data)
        this.token = res.data
        this.isLogin = true //是否从登陆页进来
        return 'pass'
      } else {
        return 'error'
      }
    },
    // 存储用户信息
    setUserInfo(data: userInfoType) {
      this.userInfo = data
    },
    userLogOut() {
      this.userInfo = {}
      this.token = ''
    },
  },
  getters: {},
})
export default userStore
