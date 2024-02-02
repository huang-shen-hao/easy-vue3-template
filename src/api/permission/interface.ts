export interface getUserListRequest {
  page: number
  limit: number
  username?: string //用户名
  name?: string //昵称
}
export interface UserListResponse {
  id?: number
  createTime: string
  updateTime: string
  username?: string
  password?: string
  name?: string
  phone: null
  roleName: string
}

export interface getUserListResponse {
  code: number
  message: string
  data: {
    records: UserListResponse[]
    total: number
    size: number
    current: number
    orders: string[]
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
  ok: boolean
}

export interface userAddRequest {
  password: string
  username: string //用户名
  name: string //昵称
}

export interface userAddResponse {
  code: number
  data: null
  message: string
  ok: boolean
}

export interface userEditRequest {
  password: string
  username: string //用户名
  name: string //昵称
  id: number
}

export interface userEditResponse {
  code: number
  message: string
  data: null
  ok: boolean
}
export interface userInfoResponse {
  code: number
  message: string
  data: UserListResponse
  ok: boolean
}

export interface userDeleteResponse {
  code: number
  message: string
  data: null
  ok: boolean
}

export interface userDeleteBatchRequest {
  idList: number[]
}

export interface userDeleteBatchResponse {
  code: number
  message: string
  data: null
  ok: boolean
}

export interface userRoleType {
  id: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null
  checked?: boolean
}

export interface userRoleResponse {
  code: number
  message: string
  data: {
    assignRoles: userRoleType[]
    allRolesList: userRoleType[]
  }
  ok: boolean
}

export interface userRoleUpdateRequest {
  userId: number
  roleIdList: number[]
}

export interface userRoleUpdateResponse {
  code: number
  message: string
  data: null
  ok: boolean
}

export interface getRoleListRequest {
  page: number
  limit: number
  roleName?: string
}

export interface roleListType {
  id: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null
}

export interface getRoleListResponse {
  code: number
  message: string
  data: {
    records: roleListType[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
  ok: boolean
}

export interface roleAddRequest {
  roleName: string
}

export interface roleAddResponse {
  code: number
  message: string
  data: null
  ok: boolean
}

export interface roleInfoResponse {
  code: number
  message: string
  data: roleListType
  ok: boolean
}

export interface roleUpdateRequest {
  roleName: string
  id: number
}

export interface roleUpdateResponse {
  code: number
  message: string
  data: null
  ok: boolean
}

export interface roleDeleteResponse {
  code: number
  message: string
  data: null
  ok: boolean
}

export interface permissionTree {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: permissionTree[]
}

export interface getPermissionResponse {
  code: number
  message: string
  data: permissionTree[]
  ok: boolean
}

export interface setPermissionRequest {
  roleId: number
  permissionId: number[]
}

export interface setPermissionResponse {
  code: number
  message: string
  data: null
  ok: boolean
}

export interface menuAddRequest {
  code: string
  level: string
  name: string
  pid: number
}

export interface menuAddResponse {
  code: number
  message: string
  data: null
  ok: boolean
}

export interface menuDeleteResponse {
  code: number
  message: string
  data: null
  ok: boolean
}

export interface menuUpdateRequest {
  id: number
  code: string //权限名字
  level: string //几级菜单
  name: string
  pid: number //已有数据菜单ID
}

export interface menuUpdateResponse {
  code: number
  message: string
  data: null
  ok: boolean
}
