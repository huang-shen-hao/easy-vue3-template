// 权限管理部分接口
import request from '@/utils/request.ts'
import {
  getUserListRequest,
  getUserListResponse,
  userAddRequest,
  userAddResponse,
  userDeleteBatchResponse,
  userDeleteBatchRequest,
  userDeleteResponse,
  userEditRequest,
  userEditResponse,
  userInfoResponse,
  userRoleResponse,
  userRoleUpdateRequest,
  userRoleUpdateResponse,
  getRoleListResponse,
  getRoleListRequest,
  roleAddResponse,
  roleAddRequest,
  roleInfoResponse,
  roleUpdateRequest,
  roleUpdateResponse,
  roleDeleteResponse,
  getPermissionResponse,
  setPermissionRequest,
  setPermissionResponse,
  menuDeleteResponse,
  menuAddResponse,
  menuAddRequest,
  menuUpdateRequest,
  menuUpdateResponse,
} from '@/api/permission/interface.ts'
/**
 * 获取管理用户列表
 * **/
export const getUserList = (data: getUserListRequest) =>
  request.get<null, getUserListResponse>(
    `/admin/acl/user/${data.page}/${data.limit}/?username=${data.name}`
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

/**
 * 批量删除用户信息
 * **/
export const userDeleteBatch = (idList: number[]) =>
  request.delete<userDeleteBatchRequest, userDeleteBatchResponse>(
    '/admin/acl/user/batchRemove',
    { data: idList }
  )

/**
 * 获取用户角色
 * **/
export const userRole = (adminId: number) =>
  request.get<null, userRoleResponse>(`/admin/acl/user/toAssign/${adminId}`)

/**
 * 修改用户角色
 * **/
export const userRoleUpdate = (data: userRoleUpdateRequest) =>
  request.post<userRoleUpdateRequest, userRoleUpdateResponse>(
    '/admin/acl/user/doAssignRole',
    data
  )

/**
 * 获取角色列表
 * **/
export const getRoleList = (data: getRoleListRequest) =>
  request.get<null, getRoleListResponse>(
    `/admin/acl/role/${data.page}/${data.limit}/?roleName=${data.roleName}`
  )

/**
 * 添加角色列表
 * **/
export const roleAdd = (data: roleAddRequest) =>
  request.post<roleAddRequest, roleAddResponse>('/admin/acl/role/save', data)

/**
 * 获取角色信息
 * **/
export const getRoleInfo = (id: number) =>
  request.get<null, roleInfoResponse>(`/admin/acl/role/get/${id}`)

/**
 * 修改角色信息
 * **/
export const roleUpdate = (data: roleUpdateRequest) =>
  request.put<roleUpdateRequest, roleUpdateResponse>(
    '/admin/acl/role/update',
    data
  )

/**
 * 删除角色
 * **/
export const roleDelete = (id: number) =>
  request.delete<null, roleDeleteResponse>(`/admin/acl/role/remove/${id}`)

/**
 * 根据角色获取权限树形结构设计
 * **/
export const getPermissionDataById = (roleId: number) =>
  request.get<null, getPermissionResponse>(
    `/admin/acl/permission/toAssign/${roleId}`
  )

/**
 * 给角色分配权限
 * **/
export const setPermissionById = (data: setPermissionRequest) =>
  request.post<setPermissionRequest, setPermissionResponse>(
    `/admin/acl/permission/doAssign?roleId=${data.roleId}&permissionId=${data.permissionId}`,
    data
  )

/**
 * 获取权限树形结构设计
 * **/
export const getPermissionData = () =>
  request.get<null, getPermissionResponse>('/admin/acl/permission')

/**
 * 增加菜单
 * **/
export const menuAdd = (data: any) =>
  request.post<menuAddRequest, menuAddResponse>(
    '/admin/acl/permission/save',
    data
  )

/**
 * 菜单修改
 * **/
export const menuUpdate = (data: any) =>
  request.put<menuUpdateRequest, menuUpdateResponse>(
    '/admin/acl/permission/update',
    data
  )

/**
 * 删除菜单
 * **/
export const menuDelete = (id: number) =>
  request.delete<null, menuDeleteResponse>(`/admin/acl/permission/remove/${id}`)
