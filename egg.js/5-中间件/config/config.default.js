/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1642834666040_1072';

  // add your middleware config here
  // config.middleware = ['counter'];  // 全局配置中间件
  config.middleware = [];

  // CSRF enable false
  config.security = {
    csrf: {
      enable: false
    }
  }

  config.view = {
    mapping: {
      ".html": "ejs"
    }
  }

  config.ejs = {
    
  }

  // session配置
  config.session = {
    httpOnly: false,
    maxAge: 1000*60,
    renew: true
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
