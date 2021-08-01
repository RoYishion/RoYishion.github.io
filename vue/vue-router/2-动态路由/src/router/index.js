//配置路由相关信息
import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../components/Home'
// import About from '../components/About'
// import User from '../components/User'

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
    // component: Home
    component: () => import('../components/Home') //路由懒加载
  },
  {
    path: '/about',
    // component: About
    component: () => import('../components/About') //路由懒加载
  },
  {
    path: '/user/:userId',
    // component: User
    component: () => import('../components/User') //路由懒加载
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//3.将router对象传入到vue实例
export default router