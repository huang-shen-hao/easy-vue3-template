// 登陆页表单类型
export type FormType = {
  userName: string
  passWord: string
}

export type userInfoType = {
  userId: number
  avatar: string
  userName: string
  passWord: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
