import Vue from 'vue'
import VueRouter from 'vue-router'
import MyIndex from '../views/MyIndex'
import Mine from '../views/Mine'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MyIndex',
    component: MyIndex
  },
  {
    path: '/Mine',
    name: 'Mine',
    component: Mine,
    children: [
      {
        path: 'manageNews',
        name: 'manageNews',
        component: () => {
          return import('../views/manageNews.vue')
        }
      },
      {
        path: 'ManageUsers',
        name: 'ManageUsers',
        meta: '管理员',
        component: () => {
          return import('../views/manageUsers.vue')
        }
      },
      {
        path: 'ManageRoles',
        name: 'ManageRoles',
        meta: '管理员',
        component: () => {
          return import('../views/manageRoles.vue')
        }
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound')
  },
  {
    path: '/502',
    name: 'NotAuth',
    component: () => import('@/views/NotAuth')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router