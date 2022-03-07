import http from '@/util/requestMethods'
import { GETNEWSBYTYPENUM } from '@/services/api'
const header = {}
// 此模块用于处理所有有关的用户信息
export default async function getNewsByTypeNum(params) {
  // 通过拼装路径http://localhost:3000/api/(.env.development)+url:/news/getNewsByTypeNum(service/api)
  // 下面代码把newType newNum拼装上 、3/5
  // http://localhost:3000/api/news/getNewsByTypeNum(完整的请求api)
  return http.get(`${GETNEWSBYTYPENUM}/${params.newsType}/${params.newsNum}`, header)
}