module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'user_roles',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.STRING,
        field: 'user_id'
      },
      role_id: {
        type: DataTypes.STRING,
        field: 'role_id'
      }
    }
  )
}