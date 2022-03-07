const BASE_URL = process.env.VUE_APP_URL;//接口调用地址
//统一管理请求地址
module.exports = {
  // 登录地址
  LOGIN: `${BASE_URL}/user/login`,
  // 修改密码地址
  PWD: `${BASE_URL}/user/pwd`,
  // 获取地址
  GETUSERADDRESS: `${BASE_URL}/user/address`,
  // 删除地址
  DELETEUSERADDRESS: `${BASE_URL}/user/address`,
  // 编辑地址
  PUTADDRESS: `${BASE_URL}/user/address`,
  // 新增地址
  POSTADDRESS: `${BASE_URL}/user/address`,

  // 获取用户信息地址
  GETUSERINFO: `${BASE_URL}/user/userInfo`,
  // 编辑用户
  PUTUSERINFO: `${BASE_URL}/user/userInfo`,
  // 新增用户
  POSTUSERINFO: `${BASE_URL}/user/userInfo`,
  // 删除用户
  DELETEUSERINFO: `${BASE_URL}/user/userInfo`,
  // 获取所有用户
  GETALLUSER: `${BASE_URL}/user/users`,
};