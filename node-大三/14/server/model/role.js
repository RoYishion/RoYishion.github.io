module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'role',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rolename: {
        type: DataTypes.STRING,
        field: 'rolename'
      }
    }
  )
}