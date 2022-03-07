const rolesServive = require('../service/rolesService');

module.exports = {
  getAllRoles: async (ctx, next) => {
    try {
      let result = await rolesServive.getAllRoles()
      if (result) {
        ctx.body = {
          success: true,
          err: { code: 1, msg: '获取角色列表成功' },
          data: { result}
        };
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: { code: 0, msg: '获取角色列表失败' }
      };
    }
  },

  // 增
  addRole: async (ctx, next) => {
    let addRoles = await rolesServive.addRole(ctx.request.body);
    if (addRoles) {
      ctx.body = {
        success: true,
        err: { code: 1, msg: '新增角色成功' },
        data: { addRoles }
      };
    } else {
      ctx.body = {
        success: false,
        err: { code: 0, msg: '新增角色失败' }
      };
    }
  },

  // 删
  deleteRole: async (ctx, next) => {
    let deleteRole = await rolesServive.deleteRole(ctx.params.id);
    if (deleteRole) {
      ctx.body = {
        success: true,
        err: { code: 1, msg: '删除角色成功' },
        data: { deleteRole }
      };
    } else {
      ctx.body = {
        success: false,
        err: { code: 0, msg: '删除角色失败' }
      };
    }
  },

  // 改
  updateRole: async (ctx, next) => {
    let updateRole = await rolesServive.updateRole(ctx.request.body);
    if (updateRole) {
      ctx.body = {
        success: true,
        err: { code: 1, msg: '修改角色成功' },
        data: { updateRole }
      };
    } else {
      ctx.body = {
        success: false,
        err: { code: 0, msg: '修改角色失败' }
      };
    }
  }
}