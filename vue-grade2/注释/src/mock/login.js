import Mock from "mockjs";
import { getToken } from "@/util/auth";
const BASE_URL = process.env.VUE_APP_URL;
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
const checkLogin = function(req) {//登录时，执行当前函数检查，验证是否符合mock数据，返回相应的值
  let resData = null;
  const { userId, password } = JSON.parse(req.body);

  console.log(userList)
  for (let i = 0; i < userList.length; i++) {
    resData = {//定义返回结果格式
      success: false,
      data: {},
      err: {
        code: 1,
        msg: "验证失败",
      },
    };
    if (userList[i].userId == userId && userList[i].password == password) {//将mock数据与前端用户填写数据做对比
      resData = {//如果正确返回验证成功否则失败
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

// 获取所有用户列表
const getAllUserInfo = function(req) {
  let resData = null;
  let allUserList = [];
  for (let i = 0; i < userList.length; i++) {
    allUserList.push({
      userName: userList[i].userName,
      userNo: userList[i].userNo,
      userId: userList[i].userId,
      userRole: userList[i].userRole,
    });
  }
  resData = {
    success: true,
    data: {
      allUserList,
    },
    err: {
      code: 0,
      msg: "获取用户列表成功",
    },
  };
  return resData;
};

// 获取url的参数
function getQueryString(url, name) {
  url = url.split("?")[1];
  var vars = url.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == name) {
      return pair[1];
    }
  }
  return false;
}

// 获取当前用户信息
const getUserInfo = function(req) {
  const userId = getQueryString(req.url, "userId");
  let resData = {
    success: false,
    data: {},
    err: {
      code: 1,
      msg: "参数有误",
    },
  };
  if (userId) {
    const user = userList.find((user) => user.userId === userId);
    resData = {
      success: true,
      data: {
        ...user,
      },
      err: {
        code: 0,
        msg: "获取用户信息成功",
      },
    };
  }
  return resData;
};

// 添加用户
const addUser = function(req) {
  const data = JSON.parse(req.body);
  userList.push(data);
  console.log(userList);
  const resData = {
    success: true,
    data: {
      data,
    },
    err: {
      code: 0,
      msg: "添加用户成功",
    },
  };
  return resData;
};

// 编辑用户
const editUser = function(req) {
  const data = JSON.parse(req.body);
  const index = userList.findIndex((user) => user.userId === data.userId);
  userList[index] = data;
  const resData = {
    success: true,
    data: {
      data,
    },
    err: {
      code: 0,
      msg: "用户编辑成功",
    },
  };
  return resData;
};

// 删除用户
const deleteUser = function(req) {
  const userId = getQueryString(req.url, "userId");
  const index = getQueryString(req.url, "index");
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

// 修改密码
const modifyPwd = function(req) {//修改密码函数校验
  const { newPwd } = JSON.parse(req.body);
  let resData = {
    success: false,
    data: {},
    err: {
      code: 1,
      msg: "修改失败",
    },
  };

  const userId = getToken();//获取cookie userId
  if (userId) {
    const user = userList.find((user) => user.userId === userId);//查找用户表中userlist中与userId相同的数据
    user.password = newPwd;//更改该用户的密码为新输入的密码
    resData = {//返回修改成功的信息
      success: true,
      data: {},
      err: {
        code: 1,
        msg: "修改成功",
      },
    };
  }
  return resData;
};

Mock.mock(`${BASE_URL}/user/login`, "post", checkLogin);//当前该路径函数(登录函数)执行时，拦截执行当前页面checkLogin
Mock.mock(`${BASE_URL}/user/pwd`, "post", modifyPwd);
Mock.mock(RegExp(`${BASE_URL}/user/userInfo` + ".*"), "get", getUserInfo);
Mock.mock(`${BASE_URL}/user/userInfo`, "post", addUser);
Mock.mock(`${BASE_URL}/user/userInfo`, "put", editUser);
Mock.mock(RegExp(`${BASE_URL}/user/userInfo` + ".*"), "delete", deleteUser);
Mock.mock(`${BASE_URL}/user/users`, "get", getAllUserInfo);