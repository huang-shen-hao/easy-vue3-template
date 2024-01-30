// 权限管理部分接口
import request from '@/utils/request.ts'
import {
  getUserListRequest,
  getUserListResponse,
  userAddRequest,
  userAddResponse,
  userDeleteResponse,
  userEditRequest,
  userEditResponse,
  userInfoResponse,
} from '@/api/permission/interface.ts'
/**
 * 获取管理用户列表
 * **/
export const getUserList = (data: any) =>
  request.get<getUserListRequest, getUserListResponse>(
    `/admin/acl/user/${data.page}/${data.limit}`,
    data
  )

/**
 * 新增用户
 * **/
export const userAdd = (data: userAddRequest) =>
  request.post<userAddRequest, userAddResponse>('/admin/acl/user/save', data)

/**
 * 修改用户
 * **/
export const userUpdate = (data: userEditRequest) =>
  request.put<userEditRequest, userEditResponse>('/admin/acl/user/update', data)

/**
 * 获取用户信息
 * **/
export const userInfo = (id: number) =>
  request.get<null, userInfoResponse>(`/admin/acl/user/get/${id}`)

/**
 * 删除用户信息
 * **/
export const userDelete = (id: number) =>
  request.delete<null, userDeleteResponse>(`/admin/acl/user/remove/${id}`)
