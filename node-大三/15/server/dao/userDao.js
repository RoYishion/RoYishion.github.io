const { user, role } = require('../model/index');

module.exports = {
  getAllRoles: async () => {
    try {
      let result = await role.findAll();
      return result;
    } catch (error) {
      console.log('获取全部角色错误：' + error);
      return null;
    }
  },
  getUserByPhone: async (phone) => {
    return await user.findOne({
      where: {
        phone
      }
    })
  },
  getAllUsersByPhone: async (phone) => {
    try {
      let result = await user.findAll({
        where: {
          phone
        },
      });
      return result;
    } catch (error) {
      console.log('电话查找用户出错,' + error);
      return null;
    }
  },
  getUsersBySearchInfo: async (query) => {
    try {
      let result = await user.findAll({
        where: query,
        attributes: ['id', 'username', 'phone', 'role_id'],
        include: [role]
      })
      return result;
    } catch (error) {
      console.log('根据条件查询用户出错：' + error);
      return null;
    }
  },
  createUser: async (data) => {
    try {
      let result = await user.create(data);
      return result;
    } catch (error) {
      console.log('新增用户出错：' + error);
      return null;
    }
  },
  findUserByPk: async (id) => {
    return await user.findOne({
      where: {
        id: id
      },
      attributes: ['id', 'username', 'phone', 'role_id'],
      include: [role]
    })
  },
  updateUser: async (data) => {
    try {
      let result = await user.update({
        username: data.username,
        phone: data.phone,
        role_id: data.role_id
      }, {
        where: {
          id: data.id
        }
      });
      console.log('修改成功');
      return result;
    } catch (error) {
      console.log('修改失败：' + error);
      return null;
    }
  },
  deleteUser: async (id) => {
    try {
      let result = await user.destroy({
        where: { id }
      });
      console.log('删除成功');
      return result;
    } catch (error) {
      console.log('删除失败：' + error);
      return null;
    }
  }
}