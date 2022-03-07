// import axios from "@/util/request";

// let instance = axios();
// export default {
//   get(url, params, headers) {
//     let options = {};
//     if (params) {
//       options.params = params;
//     }
//     if (headers) {
//       options.headers = headers;
//     }
//     return instance.get(url, options);
//   },
//   post(url, params, headers) {
//     let options = {};
//     if (headers) {
//       options.headers = headers;
//     }
//     return instance.post(url, params, options);
//   },
//   put(url, params, headers) {
//     let options = {};
//     if (headers) {
//       options.headers = headers;
//     }
//     return instance.put(url, params, options);
//   },
//   delete(url, params, headers) {
//     let options = {};
//     if (params) {
//       options.params = params;
//     }
//     if (headers) {
//       options.headers = headers;
//     }
//     return instance.delete(url, options);
//   },
// };

// import request from '@util/request'
import axios from 'axios'

const http = {
  get(url, params) {
    const config = {
      method: 'get',
      url: url.toString()
    };
    if (params) config.params = params;
    return axios.request(config);
  },
  post(url, params) {
    const config = {
      method: 'post',
      url: url
    };
    if (params) config.data = params;
    return axios.request(config);
  },
  put(url, params) {
    const config = {
      method: 'put',
      url: url
    };
    if (params) config.data = params;
    return axios.request(config);
  },
  delete(url, params) {
    const config = {
      method: 'delete',
      url: url
    };
    if (params) config.data = params;
    return axios.request(config);
  }
}

export default http;