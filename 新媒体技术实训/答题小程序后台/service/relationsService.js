const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { relation, user, score } = require('../model/index');

module.exports = {
  getAllRelations: async (id) => {
    try {
      let result = await relation.findAll({
        where: {
          parantid: id
        },
        include: [user]
      })
      console.log(result);
      console.log('查找列表成功');

      var score2 = [];
      for (let i = 0; i < result.length; i++) {
        var score3 = await score.findAll({
          where: {
            userid: result[i].dataValues.childid
          }
        })
        for (let j = 0; j < score3.length; j++) {
          score2.push(score3[j].dataValues)
        }
      }
      console.log(score2)
      return { result, score2 };
    } catch (error) {
      console.log('查找列表错误:' + error);
      return null;
    }
  },

  addRelation: async (Info) => {
    let result = await relation.create(Info);
    if (result) {
      return { success: 1, info: '新增成功' }
    } else {
      return { success: 0, info: '新增失败' }
    }
  },

  deleteRelation: async (id) => {
    let result = await relation.destroy({
      where: {
        id: id
      }
    });
    if (result) {
      return { success: 1, info: '删除成功' }
    } else {
      return { success: 0, info: '删除失败' }
    }
  }
}