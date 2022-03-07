import axios from 'axios'

//创建axios实例
let http = axios.create({
    headers: {'Content-Type': 'application/json'},
    timeout: 6000
})

//添加请求拦截器
http.interceptors.request.use(config => {  //请求成功
    return config  //拦截之后要再发送出去，让其他模块接收到
}, error => {  
    return Promise.reject(error)  //请求失败，返回错误信息
})

//添加响应拦截器
http.interceptors.response.use(res => {  //响应成功，拿到response
    let {data} = res
    return data  //拦截之后要再发送出去，让其他模块接收到
}, error => {  //响应失败
    let info = {}
    let {status, statusText, data} = error.response
    if(!error.response) {
        info = {
            code: 5000,
            msg: 'Network Error'
        }
    } else {
        //整理错误信息格式
        info = {
            code: status,
            data: data,
            msg: statusText
        }
    }
    return Promise.reject(info)
})

//创建统一封装的axios实例
//@return {AxiosInstance}
export default function() {
    return http
}