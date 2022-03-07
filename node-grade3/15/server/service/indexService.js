const userDao = require('../dao/userDao');
const encryption = require('../lib/encryption');

module.exports = {
  checkLogin: async (phone, password) => {
    console.log(phone);
    console.log(password);
    let user = await userDao.getUserByPhone(phone);
    if (user) {
      let encryPass = await encryption.getMd5Pass(password, user.salt);
      if (encryPass == user.password) {
        return user;
      }
    }
    return null;
  }
}