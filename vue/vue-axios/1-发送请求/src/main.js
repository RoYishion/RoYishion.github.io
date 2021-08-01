import Vue from 'vue'
import App from './App'

import axios from 'axios'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    render: h => h(App)
})

// 1.axios基本使用
// axios({
//     url: 'http://123.207.32.32:8000/home/multidata',  //向url请求数据
//     methods: 'get'
// }).then(res => {  //请求成功后执行
//     console.log(res);
// })

// axios({
//     url: 'http://123.207.32.32:8000/home/data',
//     params: {  //专门针对get请求的参数拼接，里面的内容会自动拼接到url尾部
//         type: 'pop',
//         page: 1
//     }
// }).then(res => {
//     console.log(res);
// })

// 2.axios发送并发请求，返回结果是数组。使用全局的axios和对应的配置进行网络请求
axios.defaults.baseURL = 'http://123.207.32.32:8000'
axios.defaults.timeout = 5000

axios.all([axios({
    url: '/home/multidata'
}), axios({
    url: '/home/data',
    params: {
        type: 'sell',
        page: 5
    }
})]).then(results => {  //两个请求完成之后执行
    console.log(results)
    })