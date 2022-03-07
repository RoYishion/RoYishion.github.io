const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { role } = require('../model/index');

module.exports = {
  getAllRoles: async () => {
    try {
      let result = await role.findAll()
      console.log('查找角色列表成功');
      return result;
    } catch (error) {
      console.log('查找角色列表错误:' + error);
      return null;
    }
  },

  addRole: async (roleInfo) => {
    console.log(roleInfo);
    console.log(666666666666666666666666666666666);
    let result = await role.create(roleInfo);
    console.log(roleInfo)
    if (result) {
      return { success: 1, info: '新增角色成功' }
    } else {
      return { success: 0, info: '新增角色失败' }
    }
  },

  deleteRole: async (id) => {
    let result = await role.destroy({
      where: {
        id: id
      }
    });
    if (result) {
      return { success: 1, info: '删除角色成功' }
    } else {
      return { success: 0, info: '删除角色失败' }
    }
  },

  updateRole: async (data) => {
    let result = await role.update({
      rolename: data.rolename,
      role_id: data.role_id
    }, {
      where: {
        id: data.id
      }
    });
    if (result) {
      return { success: 1, info: '修改角色成功' }
    } else {
      return { success: 0, info: '修改角色失败' }
    }
  }
}