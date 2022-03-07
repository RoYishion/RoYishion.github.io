// const BASE_URL = 'http://localhost:8080'
const BASE_URL = process.env.VUE_APP_URL
//统一管理请求地址
module.exports = {
    LOGIN: `${BASE_URL}/user/login`,
    GETUSERADDRESS: `${BASE_URL}/user/address`,
    DELETEUSERADDRESS: `${BASE_URL}/user/address`,
    PUTADDRESS: `${BASE_URL}/user/address`,
    POSTADDRESS: `${BASE_URL}/user/address`
}