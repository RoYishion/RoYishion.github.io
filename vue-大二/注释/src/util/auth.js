import Cookies from "js-cookie";

const TokenKey = "userId";

// 获取当前的token
export function getToken() { // cookie方法 通过key获取cookie值
  return Cookies.get(TokenKey);
}

// 设置登录用户的token, 存储到cookie中
export function setToken(token) { // 存储cookie，设置cookie
  // 登陆成功保存用户信息
  let sum = 2; // 失效时间2小时
  let time = new Date(new Date().getTime() + sum * 60 * 60 * 1000);
  return Cookies.set(TokenKey, token, { expires: time });
}

// 移除token
export function removeToken() {  // remove删除cookie
  return Cookies.remove(TokenKey);
}