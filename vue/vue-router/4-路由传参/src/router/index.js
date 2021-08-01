//配置路由相关信息
import Vue from 'vue'
import VueRouter from 'vue-router'

//1.通过Vue.use(插件)，安装插件
Vue.use(VueRouter)

//2.创建VueRouter对象

//配置路由与组件之间的映射关系
const routes = [
  {
    path: '/',
    // redirect重定向
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../components/Home'), //路由懒加载
    children: [
      {
        path: '/',
        // redirect重定向
        redirect: 'news'
      },
      {
        path: 'news',
        component: () => import('../components/HomeNews')
      },
      {
        path: 'message',
        component: () => import('../components/HomeMessage')
      }
    ]
  },
  {
    path: '/about',
    component: () => import('../components/About')
  },
  {
    path: '/user/:userId',
    component: () => import('../components/User')
  },
  {
    path: '/profile',
    component: () => import('../components/Profile')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//3.将router对象传入到vue实例
export default router