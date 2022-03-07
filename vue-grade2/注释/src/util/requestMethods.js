import axios from "@/util/request";

let instance = axios();
export default {
  // 封装get请求, 参数在请求地址中
  get(url, params, headers) {
    let options = {};
    if (params) {
      options.params = params;
    }
    if (headers) {
      options.headers = headers;
    }
    return instance.get(url, options);
  },
  // 封装post请求, 参数在req.body中
  post(url, params, headers) {
    let options = {};
    if (headers) {
      options.headers = headers;
    }
    return instance.post(url, params, options);
  },
  // 封装put请求, 参数在req.body中获取
  put(url, params, headers) {
    let options = {};
    if (headers) {
      options.headers = headers;
    }
    return instance.put(url, params, options);
  },
  // 封装delete请求, 参数在请求地址中
  delete(url, params, headers) {
    let options = {};
    if (params) {
      options.params = params;
    }
    if (headers) {
      options.headers = headers;
    }
    return instance.delete(url, options);
  },
};
