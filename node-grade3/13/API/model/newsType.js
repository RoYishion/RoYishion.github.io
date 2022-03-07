module.exports = function (sequelize, DataTypes) {
  return sequelize.define('news_type', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    news_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  })
}