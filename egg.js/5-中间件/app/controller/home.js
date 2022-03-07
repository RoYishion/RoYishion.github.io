'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async a() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async testHanhanService() {
    const ctx = this.ctx;
    let id = ctx.query.id;
    const res = await ctx.service.hanhan.hanhan(id);
    ctx.body = res;
  }
}

module.exports = HomeController;