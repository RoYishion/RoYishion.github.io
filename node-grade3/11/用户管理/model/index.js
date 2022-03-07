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

module.exports = { user, role }