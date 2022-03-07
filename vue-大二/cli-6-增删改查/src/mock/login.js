import Mock from 'mockjs'
const BASE_URL = process.env.VUE_APP_URL;
const userList = [
    {
        userId: '1001',
        password: '123456',
        userName: '张三',
        userNo: '194123456',
        userRole: 'admin'
    },
    {
        userId: '1002',
        password: '123456',
        userName: '李四',
        userNo: '196123456',
        userRole: 'user'
    }
]

const checkLogin = function(req) {
    let resData = null;
    const {userId, password} = JSON.parse(req.body)

    for(let i = 0; i < userList.length; i ++) {
        resData = {
            success: false,
            data: {},
            err: {
                code: 1,
                msg: '验证失败'
            }
        }
        if(userList[i].userId == userId && userList[i].password == password) {
            resData = {
                success: true,
                data: {
                    userId: userList[i].userId,
                    userName: userList[i].userName,
                    userNo: userList[i].userNo,
                    userRole: userList[i].userRole
                },
                err: {
                    code: 0,
                    msg: '验证成功'
                }
            }
            break;
        }
    }
    return resData
};

Mock.mock(`${BASE_URL}/user/login`, 'post', checkLogin)