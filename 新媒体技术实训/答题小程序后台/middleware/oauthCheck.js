const passport = require('../middleware/passport');
module.exports = {
  apiJwtCheck: async (ctx, next) => {
    console.log(ctx.request.header.authorization);
    if (ctx.request.header.authorization) {
      return passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) {
          ctx.body = {
            success: false,
            err: {
              code: 0,
              msg: info
            }
          }
        }
        if (user) {
          await next();
        } else {
          ctx.body = {
            success: false,
            err: {
              code: 0,
              msg: info
            }
          };
        }
      })(ctx, next)
    } else {
      ctx.body = {
        success: false,
        err: {
          code: 0,
          msg: '未授权用户，禁止访问'
        }
      }
    }
  },

  sessionCheck: async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      await next();
    } else {
      ctx.session.logInfo = '登陆账号异常，请重新登陆';
      ctx.response.redirect('/login');
    }
  }
}