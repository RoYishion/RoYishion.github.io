import axios from 'axios'

//创建axios实例
let http = axios.create({
    headers: {'Content-Type': 'application/json'},
    timeout: 6000
})

//设置post,put默认Content-Type
// http.dafault.headers.post['Content-Type'] = 'application/json'
// http.dafault.headers.put['Content-Type'] = 'application/json'

//添加请求拦截器
http.interceptors.request.use(config => {
    return config
}, error => {
    //请求错误处理
    return Promise.reject(error)
})

//添加响应拦截器
http.interceptors.response.use(response => {
    let {data} = response
    return data
}, error => {
    let info = {}
    let {status, statusText, data} = error.response
    if(!error.response) {
        info = {
            code: 5000,
            msg: 'Network Error'
        }
    } else {
        //此处整理错误信息格式
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