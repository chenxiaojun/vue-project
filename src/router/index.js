import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/statistic/analysis'
    // children: [{
    //   path: 'dashboard',
    //   name: 'Dashboard',
    //   component: () => import('@/views/dashboard/index'),
    //   meta: { title: 'Dashboard', icon: 'dashboard' }
    // }]
  },
  {
    path: '/statistic',
    component: Layout,
    redirect: '/statistic/analysis',
    alwaysShow: true,
    name: '结果优化',
    meta: { title: '结果优化', icon: 'el-icon-folder' },
    children: [
      {
        path: 'analysis',
        name: '结果管理页',
        component: () => import('@/views/analysis/index'),
        meta: { title: '结果管理页', icon: 'el-icon-tickets' }
      }
    ]
  },
  {
    path: '/problems',
    component: Layout,
    redirect: '/problems/lists',
    alwaysShow: true,
    name: '告警展示',
    meta: { title: '告警展示', icon: 'el-icon-timer' },
    children: [
      {
        path: 'lists',
        name: '告警列表',
        component: () => import('@/views/problems/index'),
        meta: { title: '告警列表', icon: 'list' }
      },
      {
        path: 'analysis-demo1',
        name: '根因分析1',
        hidden: false,
        component: () => import('@/views/problems/analysis-demo1'),
        meta: { title: '根因分析1', icon: 'el-icon-coin' }
      },
      {
        path: 'analysis-demo2',
        name: '根因分析2',
        hidden: false,
        component: () => import('@/views/problems/analysis-demo2'),
        meta: { title: '根因分析2', icon: 'el-icon-coin' }
      },
      {
        path: 'diagram',
        name: '因果图展示',
        component: () => import('@/views/problems/diagram'),
        meta: { title: '因果图展示', icon: 'el-icon-s-help' }
      }
    ]
  },
  {
    path: '/ricky-demos',
    component: Layout,
    redirect: '/ricky-demos/index',
    alwaysShow: true,
    hidden: true,
    name: '实验室',
    meta: { title: '实验室', icon: 'el-icon-monitor' },
    children: [
      {
        path: 'index',
        name: 'demo',
        component: () => import('@/views/ricky-demos/index'),
        meta: { title: 'demo', icon: 'el-icon-mouse' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
