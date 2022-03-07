const md5 = require('md5');
const uuid = require('uuid');

module.exports = {
  // 获取uuid
  generateId: () => {
    return uuid.v4();
  },
  getMd5Pass: async (val, salt) => {
    let passSalt = md5(md5(val) + salt);
    return passSalt;
  }
}