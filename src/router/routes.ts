import { RouteRecordRaw } from 'vue-router'

export const constantRoute: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', //命名路由
    meta: { title: '登录', hidden: true, icon: 'shouye' },
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404', //命名路由
    meta: { title: '404', hidden: true, icon: 'shouye' },
  },
  {
    // 重定向404页面
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: { title: 'any', hidden: true, icon: 'shouye' },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout', //命名路由
    meta: { title: '', hidden: false, icon: 'shouye' },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', hidden: false, icon: 'shouye' },
      },
    ],
  },
  {
    path: '/dataScreen',
    component: () => import('@/views/dataScreen/index.vue'),
    name: 'dataScreen', //命名路由
    meta: { title: '数据大屏', hidden: false, icon: 'shujudaping' },
  },
  {
    path: '/permissions',
    component: () => import('@/layout/index.vue'),
    name: 'Acl', //命名路由
    meta: { title: '权限管理', hidden: false, icon: 'quanxianguanli' },
    redirect: '/permissions/userManagement',
    children: [
      {
        path: '/permissions/userManagement',
        component: () => import('@/views/permission/userManagement/index.vue'),
        name: 'Acl', //命名路由
        meta: { title: '用户管理', hidden: false, icon: 'yonghuguanli' },
      },
      {
        path: '/permissions/roleManagement',
        component: () => import('@/views/permission/roleManagement/index.vue'),
        name: 'Role', //命名路由
        meta: { title: '角色管理', hidden: false, icon: 'jueseguanli' },
      },
      {
        path: '/permissions/menuManagement',
        component: () => import('@/views/permission/menuManagement/index.vue'),
        name: 'Permission', //命名路由
        meta: { title: '菜单管理', hidden: false, icon: 'caidanguanli' },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Goods', //命名路由
    meta: { title: '商品管理', hidden: false, icon: 'product' },
    redirect: '/product/brandManagement', //访问一级路由重定向第一个二级路由
    children: [
      {
        path: '/product/brandManagement',
        component: () => import('@/views/product/brandManagement/index.vue'),
        name: 'Trademark', //命名路由
        meta: { title: '品牌管理', hidden: false, icon: 'pingpaiguanli' },
      },
      {
        path: '/product/inventoryManagement',
        component: () =>
          import('@/views/product/inventoryManagement/index.vue'),
        name: 'Attr', //命名路由
        meta: { title: '库存管理', hidden: false, icon: 'kucunguanli' },
      },
    ],
  },
]
