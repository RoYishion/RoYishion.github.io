const BASE_URL = process.env.VUE_APP_URL;
//统一管理请求地址
module.exports = {
    // 登录地址
    LOGIN: `${BASE_URL}/user/loginGetToken`,

    // 获取新闻
    GETNEWSBYTYPENUM: `${BASE_URL}/news/getNewsByTypeNum`,
    // 获取所有新闻
    GETALLNEWS: `${BASE_URL}/news/getAllNews`,
    // 添加新闻
    ADDNEW: `${BASE_URL}/news/addNew`,
    // 删除新闻
    DELETENEW: `${BASE_URL}/news/deleteNew`,
    // 修改新闻
    UPDATENEW: `${BASE_URL}/news/updateNew`,

    // 获取所有用户
    GETALLUSER: `${BASE_URL}/user/searchUser`,
    // 查找用户
    GETUSERINFOBYID: `${BASE_URL}/user/userInfo`,
    // 新增用户
    SAVEUSER: `${BASE_URL}/user/saveUser`,
    // 删除用户
    DELETEUSER: `${BASE_URL}/user/deleteUser`,
    // 编辑用户
    UPDATEUSER: `${BASE_URL}/user/updateUser`,

    // 获取所有角色
    GETALLROLES: `${BASE_URL}/role/getAllRoles`,
    // 新增角色
    SAVEROLE: `${BASE_URL}/role/saveRole`,
    // 删除角色
    DELETEROLE: `${BASE_URL}/role/deleteRole`,
    // 编辑角色
    UPDATEROLE: `${BASE_URL}/role/updateRole`
}