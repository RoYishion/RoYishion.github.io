module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'news',
    {
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
      news_date: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      news_type_id: {
        type: DataTypes.INTEGER,
        field: 'news_type_id'
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'userId'
      }
    })
}