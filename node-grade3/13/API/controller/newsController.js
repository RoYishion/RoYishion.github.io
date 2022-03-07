const newsService = require('../service/newsService');
module.exports = {
  getNewsByTypeNum: async (ctx, next) => {
    try {
      const newsTypeId = ctx.params.newsTypeId;
      const newsNum = ctx.params.newsNum;
      if (!isNaN(newsTypeId) && !isNaN(newsNum)) {
        const result = await newsService.getNewsByTypeNum(parseInt(newsTypeId), parseInt(newsNum));
        if (result) {
          ctx.body = {
            success: true,
            err: { code: 1, msg: '获取新闻列表获取成功!' },
            data: result
          };
        }
      } else {
        ctx.body = {
          success: false,
          err: { code: 0, msg: '获取新闻列表参数错误，获取失败!' }
        };
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: { code: 0, msg: '获取新闻列表获取失败!' }
      };
    }
  }
}