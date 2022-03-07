import {
  LOGIN,
  SAVEUSER,
  DELETEUSER,
  UPDATEUSER,
  GETALLUSER,
  GETUSERINFOBYID
} from "@/services/api"; // 资源请求的地址
import http from "../util/requestMethods";

const header = {};

// 登录
export async function login(params) {
  return http.post(LOGIN, params, header);
}

// 获取所有用户列表
export async function getAllUser(params) {
  return http.post(`${GETALLUSER}`, params, header);
}

// 新增用户
export async function addUser(params) {
  return http.post(`${SAVEUSER}`, params, header);
}

// 删除用户
export async function deleteUser(params) {
  return http.delete(`${DELETEUSER}/${params}`, null, header);
}

// 编辑用户
export async function updateUser(params) {
  return http.post(`${UPDATEUSER}`, params, header);
}

// 查找用户
export async function getUserInfoById(params) {
  return http.get(`${GETUSERINFOBYID}/${params.userId}`, null, header);
}

// 搜索用户
export async function searchUser(params) {
  return http.post(`${GETALLUSER}`, params, header);
}