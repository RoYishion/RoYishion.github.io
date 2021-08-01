import Vue from 'vue'
import App from './App'
import {request} from './network/request'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    render: h => h(App)
})

//封装request模块
request({
    url: '/home/multidata'
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})