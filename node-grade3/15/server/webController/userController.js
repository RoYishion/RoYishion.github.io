const userDao = require('../dao/userDao');
const userService = require('../service/userService');
const encryption = require('../lib/encryption');
const indexService = require('../service/indexService');

module.exports = {
  getUserInfoById: async (ctx, next) => {
    try {
      const userId = ctx.params.id;
      if (userId) {
        const result = await userService.getUserById(userId);
        if (result) {
          ctx.body = {
            success: true,
            err: {
              code: 1,
              msg: '获取用户信息成功'
            },
            data: result
          };
        }
      } else {
        ctx.body = {
          success: false,
          err: {
            code: 0,
            msg: '用户参数错误，获取失败'
          }
        };
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: {
          code: 0,
          msg: '用户信息获取失败'
        }
      };
    }
  },

  // 增
  saveUser: async (ctx, next) => {
    let saveUser = await userService.saveUser(ctx.request.body);
    if(saveUser.success) {
      ctx.body = {
        success: true,
        err: { code: 1, msg: saveUser.info },
        data: saveUser
      };
    } else {
      ctx.body = {
        success: false,
        err: { code: 0, msg: saveUser.info }
      };
    }
  },

  // 删
  deleteUser: async (ctx, next) => {
    let deleteUser = await userDao.deleteUser(ctx.params.id);
    if(deleteUser) {
      ctx.body = {
        success: true,
        err: { code: 1, msg: '删除用户成功' },
        data: deleteUser
      };
    } else {
      ctx.body = {
        success: false,
        err: { code: 0, msg: '删除用户失败' }
      };
    }
  },

  // 改
  updateUser: async (ctx, next) => {
    let updateUser = await userService.updateUser(ctx.request.body);
    if(updateUser.success) {
      ctx.body = {
        success: true,
        err: { code: 1, msg: updateUser.info },
        data: updateUser
      };
    } else {
      ctx.body = {
        success: false,
        err: { code: 0, msg: updateUser.info }
      };
    }
  },

  // 查
  searchUser: async (ctx, next) => {
    let searchUsers = await userService.searchUserByInfo(ctx.request.body);
    let roles = await userDao.getAllRoles();
    if (roles && searchUsers[0]) {
      ctx.body = {
        success: true,
        err: { code: 1, msg: '获取用户成功' },
        data: { roles, searchUsers }
      };
    } else {
      ctx.body = {
        success: false,
        err: { code: 0, msg: '获取用户失败' }
      };
    }
  },

  loginGetToken: async (ctx, next) => {
    const phone = ctx.request.body.phone;
    const password = ctx.request.body.password;
    if (phone && password) {
      let user = await indexService.checkLogin(phone, password);
      if (user) {
        let payload = { userid: user.id };
        let token = encryption.getUserToken(payload);
        if (token) {
          ctx.body = {
            success: true,
            err: {
              code: 1,
              msg: '获取认证成功'
            },
            data: { token: 'Bearer ' + token }
          };
        } else {
          ctx.body = {
            success: false,
            err: {
              code: 0,
              msg: '获取认证失败'
            }
          };
        }
      } else {
        ctx.body = {
          success: false,
          err: {
            code: 0,
            msg: '用户不存在'
          }
        };
      }
    } else {
      ctx.body = {
        success: false,
        err: {
          code: 0,
          msg: '账号密码提交失败'
        }
      };
    }
  }
}