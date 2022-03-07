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
        component: function () {
          return import('../views/mybooks.vue')
        }
      },
      {
        path: 'myaddress',
        name: 'myaddress',
        component: function () {
          return import('../views/myaddress.vue')
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router