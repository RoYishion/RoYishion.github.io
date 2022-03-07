const passport = require('koa-passport');
const LocalSrtategy = require('passport-local').Strategy;
const indexService = require('../service/indexService');

passport.use(new LocalSrtategy({
  usernameField: 'phone',
  passwordField: 'password'
},
  async function (phone, password, done) {
    let result = await indexService.checkLogin(phone, password);
    if (result) {
      return done(null, result, '登陆成功');
    } else {
      return done(null, false, '账号或密码错误');
    }
  }
))

passport.serializeUser(function (user, done) {
  user.password = '';
  user.salt = '';
  console.log('user_ps' + user);
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

module.exports = passport;