module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'relation',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      parantid: {
        type: DataTypes.STRING,
        field: 'parantid'
      },
      childid: {
        type: DataTypes.STRING,
        field: 'childid'
      }
    }
  )
}