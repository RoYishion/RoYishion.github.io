const relationsService = require('../service/relationsService');

module.exports = {
  getAllRelations: async (ctx, next) => {
    try {
      let result = await relationsService.getAllRelations(ctx.params.id)
      if (result) {
        ctx.body = {
          success: true,
          err: { code: 1, msg: '获取列表成功' },
          data: { result }
        };
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: { code: 0, msg: '获取列表失败' }
      };
    }
  },

  // 增
  addRelation: async (ctx, next) => {
    let addRoles = await relationsService.addRelation(ctx.request.body);
    if (addRoles) {
      ctx.body = {
        success: true,
        err: { code: 1, msg: '新增成功' },
        data: { addRoles }
      };
    } else {
      ctx.body = {
        success: false,
        err: { code: 0, msg: '新增失败' }
      };
    }
  },

  // 删
  deleteRelation: async (ctx, next) => {
    let deleteRole = await relationsService.deleteRelation(ctx.params.id);
    if (deleteRole) {
      ctx.body = {
        success: true,
        err: { code: 1, msg: '删除成功' },
        data: { deleteRole }
      };
    } else {
      ctx.body = {
        success: false,
        err: { code: 0, msg: '删除失败' }
      };
    }
  }
}