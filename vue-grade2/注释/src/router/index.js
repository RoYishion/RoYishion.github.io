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
        path: 'mybooks',
        name: 'mybooks',
        meta: 'admin, user',
        component: () => {
          return import('../views/mybooks.vue')
        }
      },
      {
        path: 'myaddress',
        name: 'myaddress',
        meta: 'admin, user',
        component: () => {
          return import('../views/myaddress.vue')
        }
      },
      {
        path: 'ManageUsers',
        name: 'ManageUsers',
        meta: 'admin',
        component: () => {
          return import('../views/manageUsers.vue')
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