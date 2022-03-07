const userDao = require('../dao/userDao');
module.exports = {
  checkLogin: async(phone, password) => {
    let user = await userDao.getUserByPhone(phone);
    if(user) {
      if(user.password == password) {
        return user;
      }
    }
    return null;
  }
}