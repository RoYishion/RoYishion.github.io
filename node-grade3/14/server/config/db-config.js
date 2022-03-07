module.exports = {
  mysql: {
    database: 'koa_test',  // 数据库名称
    user: 'root',  // mysql用户名
    password: '123456',  // mysql密码
    PORT: '3306',  // mysql端口号
    host: 'localhost'  // 服务器ip
  },
  sequelize: {
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      // 字符集
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      supportBigNumbers: true,
      bigNumberString: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      // 是否冻结表名，最好设置为true,要不sequelize会自动给表名
      // 加上复数s造成查询数据失败
      freezeTableName: true,
      // 是否为表添加createdAt和updatedAt字段
      // createdAt记录表的创建时间
      // updatedAt记录字段更新时间
      timestamps: false,
      // 是否为表添加deletedAt字段
      // 不真正删除，而是添加deleted字段
      paranoid: false,
      // 是否开启op
      operatorAliases: false
    },
    // 时区
    timezone: '+08:00'
  }
}