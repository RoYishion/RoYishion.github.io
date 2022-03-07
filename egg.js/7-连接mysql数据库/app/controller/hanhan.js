'use strict';

const Controller = require('egg').Controller;

class hanhanController extends Controller {
  async index() {
    const { ctx } = this;
    const username = ctx.session.username;
    console.log(ctx.session.counter)
    // ctx.body = "<h1>I'm your father</h1>";
    await ctx.render('hanhan.html', {  // 调用ejs模板引擎里的模板并传入数据
      // nowTime: this.app.currentTime(),  // 调用扩展里的方法
      nowTime: this.app.timeProp,  // 调用扩展里的属性
      id: 2022,
      name: "憨憨",
      age: 21,
      username: username,
      skill: [
        '读书',
        '摄影',
        '化妆'
      ]
    })
  }

  async b() {
    const { ctx } = this;
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(ctx.body = '<h1>哈哈</h1>');
      }, 5000);
    });
  }

  // GET请求自由传参模式，在浏览器直接输入可以传参
  async bb() {
    const ctx = this.ctx;
    // ctx.body = ctx.query;

    const res = await ctx.service.hanhan.hanhan('2022');
    ctx.body = res;
  }

  // GET请求严格传参模式
  async c() {
    const ctx = this.ctx;
    ctx.body = '严格传参模式：' + ctx.params.name + ctx.params.age;
  }

  async add() {
    const ctx = this.ctx;
    ctx.cookies.set("user", "hanhanhaha", {
      maxAge: 1000*60,  // 过期时间
      httpOnly: true,  // 只允许服务端访问
      encrypt: true  // 加密，加密后Cookie允许设为中文
    });
    ctx.session.username = '我是session数据';
    ctx.body = {
      status: 200,
      data: "Cookie添加成功"
    }
  }

  async sub() {
    const ctx = this.ctx;
    ctx.cookies.set("user", null);
    ctx.session.username = null;
    ctx.body = {
      status: 200,
      data: "Cookie删除成功"
    }
  }

  async editor() {
    const ctx = this.ctx;
    ctx.cookies.set("user", "bilibili");
    ctx.session.username = '我是修改后的session数据';
    ctx.body = {
      status: 200,
      data: "Cookie修改成功"
    }
  }

  async show() {
    const ctx = this.ctx;
    const user = ctx.cookies.get("user", {
      encrypt: true  // 加密，加密后Cookie允许设为中文
    });
    console.log(user);
    ctx.body = {
      status: 200,
      data: "Cookie查看成功"
    }
  }

  async newContext() {
    const {ctx} = this;
    const params = ctx.params();
    console.log(params);
    ctx.body = "newContext";
  }

  async newRequest() {
    const {ctx} = this;
    const token = ctx.request.token;
    ctx.body = {
      status: 200,
      body: token
    }
  }

  async newResponse() {
    const {ctx} = this;
    ctx.response.token = 'hanhan';
    const testBase64 = ctx.helper.base64Encode('hanhan');
    ctx.body = testBase64;
  }
}

module.exports = hanhanController;