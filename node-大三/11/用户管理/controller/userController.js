const userDao = require('../dao/userDao');
const userService = require('../service/userService');
const encryption = require('../lib/encryption');

module.exports = {
  userManage: async (ctx, next) => {
    let roles = await userDao.getAllRoles();
    await ctx.render('userManage', {
      searchUserData: {
        roles: roles,
        opUserInfo: ctx.session.opUserInfo
      }
    })
  },

  // 增
  addUser: async (ctx, nex) => {
    let roles = await userDao.getAllRoles();
    await ctx.render('addUser', {
      searchUserData: {
        roles: roles,
        addinfo: ctx.session.addinfo
      }
    })
  },
  saveUser: async (ctx, next) => {
    let saveUser = await userService.saveUser(ctx.request.body);
    let roles = await userDao.getAllRoles();
    await ctx.render('userManage', {
      searchUserData: {
        roles: roles,
        users: saveUser
      }
    })
  },

  // 删
  deleteUser: async (ctx, next) => {
    let deleteUser = await userDao.deleteUser(ctx.request.query.id);
    let roles = await userDao.getAllRoles();
    await ctx.render('userManage', {
      searchUserData: {
        roles: roles,
        users: deleteUser
      }
    })
  },

  // 改
  openUpdateUser: async (ctx, nex) => {
    let updateUser = await userDao.findUserByPk(ctx.request.query.id);
    console.log(updateUser.role);
    await ctx.render('updateUser', {
      updateuser: updateUser
    })
  },
  updateUser: async (ctx, next) => {
    let updateUser = await userDao.updateUser(ctx.request.body);
    let roles = await userDao.getAllRoles();
    await ctx.render('userManage', {
      searchUserData: {
        roles: roles,
        users: updateUser
      }
    })
  },
  defaultPassword: async (ctx, next) => {

  },

  // 查
  searchUser: async (ctx, next) => {
    let searchusers = await userService.searchUserByInfo(ctx.request.body);
    let roles = await userDao.getAllRoles();
    await ctx.render('userManage', {
      searchUserData: {
        roles: roles,
        users: searchusers,
        opUserInfo: ''
      }
    })
  }
}