const baseConfig = require('../config/base-config');
const passport = require("koa-passport");
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtStrategy = require('passport-jwt').Strategy;
var LocalStrategy = require('passport-local').Strategy;
const indexService = require('../service/indexService');
const userService = require('../service/userService');
const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = baseConfig.jwt.secretKey;
passport.use(new jwtStrategy(opts, async (jwt_payloads, done) => {
  console.log(jwt_payloads);
  console.log("发布时间:" + new Date(jwt_payloads.iat));
  console.log("过期时间:" + new Date(jwt_payloads.exp));
  let nowDate = new Date();
  if (nowDate.getTime() <= jwt_payloads.exp) {
    const user = await userService.getUserById(jwt_payloads.userid);
    if (user) {
      return done(null, user, 'token验证成功');
    } else {
      return done(null, false, 'token验证失败');
    }
  } else {
    return done(null, false, 'token过期');
  }
}))
passport.use(new LocalStrategy({
  usernameField: "phone",
  passwordField: "password"
},
  async function (phone, password, done) {
    let result = await indexService.checkLogin(phone, password);
    if (result) {
      return done(null, result, "登录成功");
    } else {
      return done(null, false, "账号密码错误");
    }
  }
))

// session序列化与反序列化
passport.serializeUser(function (user, done) {
  user.password = "";
  user.salt = '';
  console.log("user_ps : " + user);
  done(null, user);
  // 环境中的user序列化到session中，即sessionID，同时它将作为凭证存储在用户cookie中
})

// 从session反序列化，参数为用户提交的sessionID，若存在则从数据库中查询user并存储与req.user中。
passport.deserializeUser(function (user, done) {
  done(null, user);
})

module.exports = passport