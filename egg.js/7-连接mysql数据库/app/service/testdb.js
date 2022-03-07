'use strict';

const Service = require("egg").Service;
class testdbService extends Service {
  async addPeople() {

  }

  async subPeople() {

  }

  async updatePeople() {

  }

  async showPeople() {
    try {
      const app = this.app;
      const res = await app.mysql.select('students');
      return res;
    } catch(error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = testdbService;