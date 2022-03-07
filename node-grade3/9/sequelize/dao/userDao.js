const allSqlAction = require('../lib/mysql');
const {user} = require('../model/index');

module.exports = {
  findUserByPhone: async(phone) => {
    console.log(phone);
    let sql = `select * from user where phone = '${phone}'`;
    return allSqlAction.allSqlAction(sql).then(res => {
      console.log(res);
      if(res.length >= 1) {
        return {
          userid: res[0].id,
          username: res[0].username,
          password: res[0].password,
          phone: res[0].phone
        }
      } else {
        return null;
      }
    })
  },
  getUserByPhone: async(phone) => {
    return await user.findOne({
      where: {
        phone
      }
    })
  }
}