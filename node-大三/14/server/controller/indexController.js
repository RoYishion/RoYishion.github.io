const passport = require('../middleware/passport');
const { user } = require('../model/index');

module.exports = {
  index: async (ctx, next) => {
    await ctx.render('index', {
      title: 'Hello Koa MVC!'
    })
  },
  login: async (ctx, next) => {
    await ctx.render('login')
  },
  logout: async (ctx, next) => {
    ctx.logout();
    await ctx.redirect('/');
  },
  checkLogin: async (ctx, next) => {
    return passport.authenticate('local', async (err, user, info) => {
      if (err) {
        ctx.session.errorMsg = 'passport本地验证策略错误';
        ctx.response.redirect('/error');
      }
      if (!user) {
        ctx.session.logInfo = '账号密码错误';
        ctx.response.redirect('/login');
      } else {
        ctx.login(user);
        ctx.response.redirect('/home');
      }
    })(ctx)
  },
  userManage: async (ctx, next) => {
    const result = await user.findAll();
    await ctx.render('userManage', {
      msg: result
    });
  },
  home: async (ctx, next) => {
    await ctx.render('homeIndex', {
      user: ctx.session.username
    });
  },
  error: async (ctx, next) => {
    await ctx.render('error', {});
  }
}