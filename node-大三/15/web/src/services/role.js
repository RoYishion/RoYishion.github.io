import {
  GETALLROLES,
  SAVEROLE,
  DELETEROLE,
  UPDATEROLE
} from "@/services/api"; // 资源请求的地址

import http from "../util/requestMethods";

const header = {};

// 获取所有角色列表
export async function getAllRoles(params) {
  return http.post(`${GETALLROLES}`, params, header);
}

// 新增角色
export async function addRole(params) {
  return http.post(`${SAVEROLE}`, params, header);
}

// 删除角色
export async function deleteRole(params) {
  return http.delete(`${DELETEROLE}/${params}`, null, header);
}

// 编辑角色
export async function updateRole(params) {
  return http.post(`${UPDATEROLE}`, params, header);
}