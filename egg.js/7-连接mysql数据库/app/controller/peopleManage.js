'use strict';
const Controller = require("egg").Controller;

class peopleManage extends Controller {
  async addPeople() {
    const {ctx} = this;
    ctx.body = "新增人";
  }

  async subPeople() {
    const {ctx} = this;
    ctx.body = "删除人";
  }

  async updatePeople() {
    const {ctx} = this;
    ctx.body = "修改人";
  }

  async showPeople() {
    const {ctx} = this;
    const res = await ctx.service.testdb.showPeople();
    ctx.body = "查询人" + JSON.stringify(res);
  }
}

module.exports = peopleManage;