import Mock from "mockjs";
const BASE_URL = process.env.VUE_APP_URL;
import * as mUtils from '@/util/mUtils'
// 模拟用户列表
const userList = [
  {
    userId: "1001",
    password: "123456",
    userName: "张三",
    userNo: "194123456",
    userRole: "admin",
  },
  {
    userId: "1002",
    password: "123456",
    userName: "李四",
    userNo: "196123456",
    userRole: "user",
  },
];

// 检查登陆
const checkLogin = function(req) {
  let resData = null;
  const { userId, password } = JSON.parse(req.body);
  for (let i = 0; i < userList.length; i++) {
    resData = {  // 密码错误时提示信息
      success: false,
      data: {},
      err: {
        code: 1,
        msg: "验证失败",
      }
    };
    if (userList[i].userId == userId && userList[i].password == password) {
      resData = {  // 如果正确返回验证成功，否则失败
        success: true,
        data: {
          userId: userList[i].userId,
          userName: userList[i].userName,
          userNo: userList[i].userNo,
          userRole: userList[i].userRole,
        },
        err: {
          code: 0,
          msg: "验证成功",
        },
      };
      break;
    }
  }
  return resData;
};

// 获取当前用户信息
const getUserInfo = function(req) {
  let resData = null;
  const {userId} = mUtils.param2Obj(req.url)
  resData = {
    success: false,
    data: {},
    err: {
      code: 1,
      msg: "获取信息失败"
    }
  }
  for(let i=0;i < userList.length; i++) {
    if(userId == userList[i].userId) {
      resData = {
        success: true,
        data: {
          userName: userList[i].userName,
          userNo: userList[i].userNo,
          userId: userList[i].userId,
          userRole: userList[i].userRole
        },
        err: {
          code: 0,
          msg: "获取用户信息成功"
        }
      }
      break
    }
  }
  return resData
};

// 获取所有用户列表
const getAllUserInfo = function(req) {
  let resData = null;
  let allUserList = [];
  for (let i = 0; i < userList.length; i++) {
    allUserList.push({
      userName: userList[i].userName,
      userNo: userList[i].userNo,
      userId: userList[i].userId,
      userRole: userList[i].userRole
    });
  }
  resData = {
    success: true,
    data: {
      allUserList
    },
    err: {
      code: 0,
      msg: "获取用户列表成功"
    },
  };
  return resData;
};

// 编辑用户
const editUser = function(req) {
  let resData = null;
  const {
    userId,
    userName,
    userNo,
    userRole
  } = JSON.parse(req.body);
  resData = {
    success: false,
    data: {},
    err: {
      code: 1,
      msg: "信息不完整，修改失败"
    }
  }
  if(userId) {
    for(let i=0;i < userList.length; i++) {
      if(userList[i].userId == userId) {
        userList[i].userName = userName;
        userList[i].userNo = userNo;
        userList[i].userRole = userRole;
        resData = {
          success: true,
          data: {},
          err: {
            code: 0,
            msg: "修改成功"
          }
        }
      }
    }
  }
  return resData;
}

// 添加用户
const addUser = function(req) {
  let resData = null;
  let addObj = {};
  const {
    userName,
    userNo,
    userRole
  } = JSON.parse(req.body);
  if(userName) {
    // 以时间作为唯一id
    addObj.userId = Number(Date.now());
    addObj.userName = userName;
    addObj.userNo = userNo;
    addObj.userRole = userRole;
    userList.push(addObj);
    resData = {
      success: true,
      data: {},
      err: {
        code: 0,
        msg: "添加成功"
      }
    }
  } else {
    resData = {
      success: false,
      data: {},
      err: {
        code: 1,
        msg: "添加用户失败",
      }
    }
  }
  return resData;
}

// 删除用户
const deleteUser = function(req) {
  const {index} = mUtils.param2Obj(req.url);
  userList.splice(index, 1);
  const resData = {
    success: true,
    data: {},
    err: {
      code: 0,
      msg: "用户删除成功",
    },
  };
  return resData;
};

Mock.mock(`${BASE_URL}/user/login`, "post", checkLogin);
Mock.mock(RegExp(`${BASE_URL}/user/userInfo` + ".*"), "get", getUserInfo);
Mock.mock(`${BASE_URL}/user/userInfo`, "post", addUser);
Mock.mock(`${BASE_URL}/user/userInfo`, "put", editUser);
Mock.mock(RegExp(`${BASE_URL}/user/userInfo` + ".*"), "delete", deleteUser);
Mock.mock(`${BASE_URL}/user/users`, "get", getAllUserInfo);
// 拦截的地址，拦截的请求类型，执行函数并返回
// RegExp 对象表示正则表达式，用来对字符串执行模式匹配