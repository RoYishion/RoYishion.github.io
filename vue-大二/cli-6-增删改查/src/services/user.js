import {
    LOGIN,
    GETUSERADDRESS,
    DELETEUSERADDRESS,
    PUTADDRESS,
    POSTADDRESS
    } from '@/services/api'  // 资源请求的地址
import requestMethods from '@/util/requestMethods'  // 封装的get、post等方法

const header = {}
//此模块用于处理所有有关用户信息
export async function login(params) {
    return requestMethods.post(LOGIN, params, header) //调用post请求方法
}

export async function getUserAddress(params) {
    return requestMethods.get(GETUSERADDRESS, params, header)
}

export async function deleteUserAddress(params) {
    return requestMethods.delete(DELETEUSERADDRESS, params, header)
}

export async function addAddress(params) {
    return requestMethods.post(POSTADDRESS, params, header)
}

export async function editAddress(params) {
    return requestMethods.put(PUTADDRESS, params, header)
}