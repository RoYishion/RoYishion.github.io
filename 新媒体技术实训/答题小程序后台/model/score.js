module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'scorelist',
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
      score: {
        type: DataTypes.STRING,
        field: 'score'
      },
      userid: {
        type: DataTypes.STRING,
        field: 'userid'
      }
    }
  )
}