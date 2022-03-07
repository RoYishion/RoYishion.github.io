module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        field: 'username'
      },
      password: {
        type: DataTypes.STRING,
        field: 'password'
      },
      phone: {
        type: DataTypes.STRING,
        field: 'phone'
      },
      user_id: {
        type: DataTypes.STRING,
        field: 'user_id'
      }
    }
  );
}