const scoreService = require('../service/scoreService');

module.exports = {
  getScoreList: async (ctx, next) => {
    try {
      let result = await scoreService.getScoreList()
      if (result) {
        ctx.body = {
          success: true,
          err: {
            code: 1,
            msg: '获取成绩列表成功'
          },
          data: { result }
        };
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: {
          code: 0,
          msg: '获取成绩列表失败'
        }
      };
    }
  },

  addScore: async (ctx, next) => {
    let addScore = await scoreService.addScore(ctx.request.body);
    if (addScore) {
      ctx.body = {
        success: true,
        err: {
          code: 1,
          msg: '新增成绩成功'
        },
        data: { addScore }
      };
    } else {
      ctx.body = {
        success: false,
        err: {
          code: 0,
          msg: '新增成绩失败'
        }
      };
    }
  },

  // 删
  deleteScore: async (ctx, next) => {
    let deleteScore = await scoreService.deleteScore(ctx.params.username);
    if (deleteScore) {
      ctx.body = {
        success: true,
        err: {
          code: 1,
          msg: '删除成绩成功'
        },
        data: { deleteScore }
      };
    } else {
      ctx.body = {
        success: false,
        err: {
          code: 0,
          msg: '删除成绩失败'
        }
      };
    }
  },

  // 改
  updateScore: async (ctx, next) => {
    let updateScore = await scoreService.updateScore(ctx.request.body);
    if (updateScore) {
      ctx.body = {
        success: true,
        err: {
          code: 1,
          msg: '修改成绩成功'
        },
        data: { updateScore }
      };
    } else {
      ctx.body = {
        success: false,
        err: {
          code: 0,
          msg: '修改成绩失败'
        }
      };
    }
  }
}