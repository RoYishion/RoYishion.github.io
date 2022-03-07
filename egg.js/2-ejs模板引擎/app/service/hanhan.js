'use strict';

const Services = require("egg").Service;
class HanhanServices extends Services {
  async hanhan(id) {
    return {
      id: id,
      name: '憨憨',
      age: 22
    }
  }
}

module.exports = HanhanServices;