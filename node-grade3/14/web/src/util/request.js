import axios from 'axios'

// 创建axios实例
let http = axios.create({
    headers: { 'Content-Type': 'application/json' },
    timeout: 60000
})

// 设置 post、put 默认 Content-Type
http.defaults.headers.post['Content-Type'] = 'application/json'
http.defaults.headers.put['Content-Type'] = 'application/json'

// 添加请求拦截器
http.interceptors.request.use(config => {
    return config  // 拦截之后要再发送出去，让其他模块接收到
}, error => {
    return Promise.reject(error)  // 请求失败，返回错误信息
})

// 添加响应拦截器
http.interceptors.response.use(response => {
    let { data } = response
    return data
}, error => {
    let info = {}
    if (!error.response) {
        console.log(error)
        info = {
            err: error,
            code: 5000,
            msg: 'Network Error'
        }
    } else {
        // 整理错误信息格式
        let { status, statusText, data } = error.response
        info = {
            code: status,
            data: data,
            msg: statusText
        }
    }
    return Promise.reject(info)
})

// 创建统一封装的axios实例
export default function () {
    return http
}