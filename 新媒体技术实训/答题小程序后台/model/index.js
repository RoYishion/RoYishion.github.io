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
const score = require('../model/score')(sequelizeObj, DataTypes);
const relation = require('../model/relation')(sequelizeObj, DataTypes);

role.hasMany(user, {
  foreignKey: 'role_id',
  sourceKey: 'id'
})

user.belongsTo(role, {
  foreignKey: 'role_id',
  sourceKey: 'id'
})

user.belongsTo(relation, {
  foreignKey: 'id',
  sourceKey: 'parantid'
})

relation.belongsTo(user, {
  foreignKey: 'parantid',
  sourceKey: 'id'
})

user.belongsTo(relation, {
  foreignKey: 'id',
  sourceKey: 'childid'
})

relation.belongsTo(user, {
  foreignKey: 'childid',
  sourceKey: 'id'
})
module.exports = { user, role, score, relation}