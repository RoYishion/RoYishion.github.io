const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const userDao = require('../dao/userDao');

const encryption = require('../lib/encryption');
const { user, role } = require('../model/index');

module.exports = {
  getUserById: async (userId) => {
    try {
      let result = await user.findOne({
        where: {
          id: userId
        },
        attributes: ['id', 'username', 'phone'],
        include: [{ model: role }]
      })
      return result;
    } catch (error) {
      console.log('根据id查找用户错误：' + error);
      return null;
    }
  },
  searchUser: async () => {
    let user = await userDao.getUserByPhone(phone);
    if (user) {
      let encryPass = await encryption.getMd5Pass(password, user.salt);
      if (encryPass == user.password) {
        return user;
      }
    }
  },
  searchUserByInfo: async (searchInfo) => {
    // 主要用于处理查询条件
    const likeQurey = ['username', 'phone'];
    for (let key in searchInfo) {
      if (searchInfo[key] === '' || searchInfo[key] === undefined) {
        delete searchInfo[key];
      } else {
        if (likeQurey.includes(key)) {
          searchInfo[key] = {
            [Op.like]: `%${searchInfo[key]}%`
          }
        }
      }
    }
    // 查询条件交给dao执行查询
    let searchResult = await userDao.getUsersBySearchInfo(searchInfo);
    return searchResult;
  },
  saveUser: async (userInfo) => {
    if (userInfo.phone) {
      let user = await userDao.getUserByPhone(userInfo.phone);
      if (!user) {
        let salt = encryption.generateId();
        console.log(salt);
        let encryPass = await encryption.getMd5Pass('123456', salt);
        userInfo.salt = salt;
        userInfo.password = encryPass;
        let result = await userDao.createUser(userInfo);
        if (result) {
          return { success: 1, info: '新增用户成功' }
        } else {
          return { success: 0, info: '新增用户失败' }
        }
      } else {
        return { success: 0, info: '该手机号码已存在' }
      }
    }
    return { success: 0, info: '信息提交有误' }
  },
  updateUser: async (userInfo) => {
    if (userInfo.phone) {
      let user = await userDao.getUserByPhone(userInfo.phone);
      if (!user) {
        let result = await userDao.updateUser(userInfo)
        if (result) {
          return { updateuser: userInfo, success: 1, info: '修改用户成功' };
        } else {
          return { updateuser: userInfo, success: 0, info: '修改用户失败!' };
        }
      } else {
        return { updateuser: userInfo, success: 0, info: '该手机号码已存在!' };
      }
    }
    return { updateuser: userInfo, success: 0, info: '信息提交有误!' };
  }
}