// 用户相关接口类型
export interface UserLoginRequest {
  username: string
  password: string
}
export interface UserLoginResponse {
  code: number
  message: string
  data: string
  ok: boolean
}

export interface userInfoType {
  avatar: string
  buttons: string[]
  name: string
  roles: string[]
  routes: string[]
}
export interface UserInfoResponse {
  code: number
  message: string
  data: userInfoType
  ok: boolean
}

export interface UserLogoutResponse {
  code: number
  message: string
  data: object
  ok: boolean
}
