module.exports = async(ctx, next) => {
  try {
    await next();
    if(ctx.status === 404) {
      ctx.throw(404);
    }
  } catch(error) {
    console.log('信息错误1：' + ctx.status);
    console.log('信息错误2：' + ctx.stack);
    console.log('信息错误3：' + error.status);
    const status = ctx.status || 500;
    ctx.status = status;

    if(status === 404) {
      ctx.session.errorMsg = ctx.status + '无法连接';
    } else if(status === 500) {
      ctx.session.errorMsg = ctx.status + '服务器罢工了';
    } else if(status === 302) {
      ctx.session.errorMsg = ctx.status + '没有权限';
    } else {
      ctx.session.errorMsg = '正在修复';
    }
    ctx.response.redirect('/error')
  }
}