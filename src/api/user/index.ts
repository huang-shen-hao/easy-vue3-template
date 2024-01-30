// 用户相关接口
import request from '@/utils/request.ts'
import {
  UserInfoResponse,
  UserLoginRequest,
  UserLoginResponse,
  UserLogoutResponse,
} from '@/api/user/interface.ts'

// 登陆接口_mock
// export const reqLogin = (data: UserLoginRequest) =>
//   request.post<UserLoginRequest, UserLoginResponse>('/user/login', data)
//
// // 用户信息接口_mock
// export const userInfo = () =>
//   request.get<UserInfoRequest, UserInfoResponse>('/user/info')

/**
 * 用户登陆
 **/
export const userLogin = (data: UserLoginRequest) =>
  request.post<UserLoginRequest, UserLoginResponse>(
    '/admin/acl/index/login',
    data
  )

/**
 * 获取用户信息
 **/
export const getUserInfo = () =>
  request.get<null, UserInfoResponse>('/admin/acl/index/info')
/**
 * 用户退出
 **/
export const userLogout = () =>
  request.post<null, UserLogoutResponse>('/admin/acl/index/logout')
