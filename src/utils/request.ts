import axios from 'axios'
import { ElMessage } from 'element-plus'
import { GET_TOKEN } from '@/utils/token.ts'

const request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // console.log('config', config)

  if (GET_TOKEN()) {
    config.headers.token = GET_TOKEN() //携带token
  }

  return config
})
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // console.log('popop', response.data)

    return response.data
  },
  (error) => {
    // 处理http网络请求错误
    let message: string = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权限访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器奔溃'
        break
      default:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        message = '网络开小差'
    }
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

export default request
