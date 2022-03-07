import {
  LOGIN,
  GETUSERADDRESS,
  DELETEUSERADDRESS,
  PUTADDRESS,
  POSTADDRESS,
  GETUSERINFO,
  PUTUSERINFO,
  POSTUSERINFO,
  GETALLUSER,
  DELETEUSERINFO,
} from "@/services/api"; // 资源请求的地址
import requestMethods from "@/util/requestMethods"; // 封装的get、post等方法

const header = {};

// 用户登录
export async function login(params) {
  // 登录页传来参数，params为形参，实际上为登录传来的用户名和密码
  return requestMethods.post(LOGIN, params, header); //调用post请求方法
  // requestMethods为通过axios封装的方法参数分别为
  // LOGIN:接口路径  params:接口参数，前端页面输入的用户名和密码
}

// 获取地址
export async function getUserAddress(params) {
  return requestMethods.get(GETUSERADDRESS, params, header);
}

// 删除地址
export async function deleteUserAddress(params) {
  return requestMethods.delete(DELETEUSERADDRESS, params, header);
}

// 新增地址
export async function addAddress(params) {
  return requestMethods.post(POSTADDRESS, params, header);
}

// 编辑地址
export async function editAddress(params) {
  return requestMethods.put(PUTADDRESS, params, header);
}

// 获取用户信息
export async function getUserInfo(params) {
  return requestMethods.get(GETUSERINFO, params, header);
}

// 新增用户
export async function addUser(params) {
  return requestMethods.post(POSTUSERINFO, params, header);
}

// 编辑用户
export async function editUser(params) {
  return requestMethods.put(PUTUSERINFO, params, header);
}

// 删除用户
export async function deleteUser(params) {
  return requestMethods.delete(DELETEUSERINFO, params, header);
}

// 获取所有用户列表
export async function getAllUser(params) {
  return requestMethods.get(GETALLUSER, params, header);
}