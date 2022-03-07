const newsService = require('../service/newsService');
const userDao = require('../dao/userDao');

const { user, news, newsType } = require('../model/index');
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
            err: { code: 1, msg: '获取新闻列表成功' },
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
        err: { code: 0, msg: '获取新闻列表失败!' }
      };
    }
  },

  // 查
  getAllNews: async (ctx, next) => {
    try {
      let result = await news.findAll({
        attributes: { exclude: ['news_type_id', 'userId'] },
        order: [['news_date', 'DESC']],
        include: [
          { model: newsType, attributes: [['name', 'newsTypeName']] },
          { model: user, attributes: [['username', 'createNewsUser']] }
        ]
      })
      let users = await userDao.getUsersBySearchInfo();
      let types = await newsType.findAll();
      if (result) {
        ctx.body = {
          success: true,
          err: { code: 1, msg: '获取新闻列表成功' },
          data: { result, users, types }
        };
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: { code: 0, msg: '获取新闻列表失败' }
      };
    }
  },

  // 增
  addNew: async (ctx, next) => {
    let addNews = await newsService.addNew(ctx.request.body);
    if (addNews) {
      ctx.body = {
        success: true,
        err: { code: 1, msg: '新增新闻成功' },
        data: { addNews }
      };
    } else {
      ctx.body = {
        success: false,
        err: { code: 0, msg: '新增新闻失败' }
      };
    }
  },

  // 删
  deleteNew: async (ctx, next) => {
    let deleteNew = await newsService.deleteNew(ctx.params.id);
    if (deleteNew) {
      ctx.body = {
        success: true,
        err: { code: 1, msg: '删除新闻成功' },
        data: { deleteNew }
      };
    } else {
      ctx.body = {
        success: false,
        err: { code: 0, msg: '删除新闻失败' }
      };
    }
  },

  // 改
  updateNew: async (ctx, next) => {
    let updateNew = await newsService.updateNew(ctx.request.body);
    if (updateNew) {
      ctx.body = {
        success: true,
        err: { code: 1, msg: '修改新闻成功' },
        data: { updateNew }
      };
    } else {
      ctx.body = {
        success: false,
        err: { code: 0, msg: '修改新闻失败' }
      };
    }
  }
}