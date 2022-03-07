import router from '@/router'
import Cookies from 'js-cookie'
import {Message} from 'element-ui'

// 全局路由守卫
router.beforeEach((to, from, next) => {
    // 获取令牌判断用户是否登陆
    const userId = Cookies.get('userId');
    // 已登录
    if(!userId) {
        if(to.path === '/') {
            next()
            return  //以下代码不执行
        } else {
            console.log('该用户尚未登陆');
            Message.error('请先登录');
            next('/')
        } 
    } else {
        next()
    }
})