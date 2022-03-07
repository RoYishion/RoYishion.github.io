import http from '@/util/requestMethods'
import {
  GETNEWSBYTYPENUM,
  GETALLNEWS,
  ADDNEW,
  DELETENEW,
  UPDATENEW
} from '@/services/api'
const header = {}
// 此模块用于处理所有有关的用户信息
export async function getNewsByTypeNum(params) {
  return http.get(`${GETNEWSBYTYPENUM}/${params.newsType}/${params.newsNum}`, null, header)
}

export async function getAllNews(params) {
  return http.get(`${GETALLNEWS}`, params, header)
}

export async function addNew(params) {
  return http.post(`${ADDNEW}`, params, header)
}

export async function deleteNew(params) {
  return http.delete(`${DELETENEW}/${params}`, null, header)
}

export async function updateNew(params) {
  return http.put(`${UPDATENEW}`, params, header)
}