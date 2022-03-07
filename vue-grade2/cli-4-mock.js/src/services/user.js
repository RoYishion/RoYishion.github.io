import {LOGIN} from '@/services/api'  //资源请求的地址
import requestMethods from '@/util/requestMethods'  //封装的get、post等方法

const header = {}
//此模块用于处理所有有关用户信息
export async function login(params) {
    return requestMethods.post(LOGIN, params, header)
}