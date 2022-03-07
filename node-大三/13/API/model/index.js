const config = require('../config/db-config');
const Sequelize = require('sequelize');
const { QueryTypes, DataTypes } = require('sequelize');

var sequelizeObj = new Sequelize(
  config.mysql.database,
  config.mysql.user,
  config.mysql.password,
  config.sequelize
)

const role = require('../model/role')(sequelizeObj, DataTypes);
const user = require('../model/user')(sequelizeObj, DataTypes);

role.hasMany(user, {
  foreignKey: 'role_id',
  sourceKey: 'id'
})

user.belongsTo(role, {
  foreignKey: 'role_id',
  sourceKey: 'id'
})

const newsType = require('../model/newsType')(sequelizeObj, DataTypes);
const news = require('../model/news')(sequelizeObj, DataTypes);

newsType.hasMany(news, {
  foreignKey: 'news_type_id',
  sourceKey: 'id'
})

news.belongsTo(newsType, {
  foreignKey: 'news_type_id',
  targetKey: 'id'
})

news.belongsTo(user, {
  foreignKey: 'userId',
  targetKey: 'id'
})

module.exports = { user, role, newsType, news }