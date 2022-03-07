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
      return result;
    } catch (error) {
      console.log('查找新闻列表错误:' + error);
      return null;
    }
  }
}