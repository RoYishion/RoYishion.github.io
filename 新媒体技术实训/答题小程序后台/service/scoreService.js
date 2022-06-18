const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { score } = require('../model/index');

module.exports = {
  getScoreList: async () => {
    try {
      let result = await score.findAll();
      return result;
    } catch (error) {
      return null;
    }
  },

  addScore: async (scoreInfo) => {
    let result = await score.create(scoreInfo);
    if (result) {
      return { success: 1, info: '新增成绩成功' }
    } else {
      return { success: 0, info: '新增成绩失败' }
    }
  },

  deleteScore: async (id) => {
    let result = await score.destroy({
      where: {
        id: id
      }
    });
    if (result) {
      return { success: 1, info: '删除成绩成功' }
    } else {
      return { success: 0, info: '删除成绩失败' }
    }
  },

  updateScore: async (data) => {
    let result = await score.update({
      score: data.score
    }, {
      where: {
        username: data.username
      }
    });
    if (result) {
      return { success: 1, info: '修改成绩成功' }
    } else {
      return { success: 0, info: '修改成绩失败' }
    }
  }
}