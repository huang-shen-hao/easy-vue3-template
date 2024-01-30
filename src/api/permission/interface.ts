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
