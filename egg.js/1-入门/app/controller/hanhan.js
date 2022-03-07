'use strict';

const Controller = require('egg').Controller;

class hanhanController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "<h1>I'm your father</h1>";
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

  // POST请求
  async add() {
    const ctx = this.ctx;
    ctx.body = {
      status: 200,
      data: ctx.request.body
    }
  }
}

module.exports = hanhanController;