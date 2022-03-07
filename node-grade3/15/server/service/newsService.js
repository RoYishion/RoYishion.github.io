const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { user, news, newsType } = require('../model/index');

module.exports = {
  getNewsByTypeNum: async (newsTypeId, newsNum) => {
    try {
      let result = await news.findAll({
        limit: newsNum,
        where: {
          news_type_id: newsTypeId
        },
        attributes: { exclude: ['news_type_id', 'userid'] },
        order: [['news_date', 'DESC']],
        include: [
          { model: newsType, attributes: [['name', 'newsTypeName']] },
          { model: user, attributes: [['username', 'createNewsUser']] }]
      })
      console.log('查找新闻列表成功');
      return result;
    } catch (error) {
      console.log('查找新闻列表错误:' + error);
      return null;
    }
  },

  addNew: async (newsInfo) => {
    let result = await news.create(newsInfo);
    console.log(newsInfo)
    if (result) {
      return { success: 1, info: '新增新闻成功' }
    } else {
      return { success: 0, info: '新增新闻失败' }
    }
  },

  deleteNew: async (id) => {
    let result = await news.destroy({
      where:{
        id: id
      }
    });
    if (result) {
      return { success: 1, info: '删除新闻成功' }
    } else {
      return { success: 0, info: '删除新闻失败' }
    }
  },

  updateNew: async (data) => {
    let result = await news.update({...data
    }, {
      where: {
        id: data.id
      }
    });
    if (result) {
      return { success: 1, info: '修改新闻成功' }
    } else {
      return { success: 0, info: '修改新闻失败' }
    }
  }
}