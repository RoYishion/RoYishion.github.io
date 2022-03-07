module.exports = function (sequelize, DataTypes) {
  return sequelize.define('news', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    news_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    news_content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // newsdata: {

    // }
  })
}