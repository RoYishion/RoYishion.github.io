import axios from 'axios'

export function request(config) {
    //1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    //2.axios的拦截器

    //2-1.请求拦截
    instance.interceptors.request.use(aaa => {
        console.log(aaa);
        //2-1-1.比如config中的一些信息不符合服务器的要求
        //2-1-2.比如每次发送网络请求时，显示一个等待图标
        //2-1-3.某些网络请求（比如登陆），必须携带一些特殊信息
        return aaa
    }, err => {
        console.log(err);
    });

    //2-2.响应拦截
    instance.interceptors.response.use(res => {
        console.log(res)
        return res.data
    }, err => {
        console.log(err)
    });

    //发送真正的网络请求
    return instance(config)    //instance函数本身返回Promise，不需要再定义
}