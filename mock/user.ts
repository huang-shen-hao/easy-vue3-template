function createUserList() {
  return [
    {
      userId: 1,
      avatar:
        'https://pic3.zhimg.com/v2-9059f8da65a88e4413a68fe7ad4c16fc_r.jpg?source=1940ef5c',
      userName: 'admin',
      passWord: '666666',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: [
        '/',
        '/home',
        '/permissions',
        '/permissions/userManagement',
        '/permissions/roleManagement',
      ],
      token: 'hdksajlhdipuwhdoisahdoi',
    },
    {
      userId: 2,
      avatar:
        'https://pic4.zhimg.com/v2-9c66496a535add21fe5560bf019b8cdb_r.jpg',
      userName: 'Huang',
      passWord: '888888',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: [
        '/',
        '/home',
        '/permissions',
        '/permissions/userManagement',
        '/permissions/roleManagement',
        '/product',
        '/product/brandManagement',
        '/product/inventoryManagement',
      ],
      token: 'dhsakdhkdjsnksaasdask',
    },
  ]
}

export default [
  // 用户登陆接口
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      const { userName, passWord } = body
      const checkUser = createUserList().find(
        (item) => item.userName === userName && item.passWord === passWord
      )
      if (!checkUser) {
        return { code: 201, data: { message: '账号或者密码不正确' } }
      }
      const { token } = checkUser
      return { code: 200, data: { token } }
    },
  },
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: (request) => {
      const token = request.headers.token
      const checkUser = createUserList().find((item) => item.token === token)
      if (!checkUser) {
        return { code: 201, data: { message: '获取用户信息失败' } }
      }
      return { code: 200, data: { checkUser } }
    },
  },
]
