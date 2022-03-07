import Mock from 'mockjs'
const BASE_URL = process.env.VUE_APP_URL
const checkLogin = function(req) {
    let resData = null;
    const {userId, password} = JSON.parse(req.body)
    if(userId == '123' && password == '123') {
        resData = {
            success: true,
            data: {
                userName: 'Mike',
                userNo: '123456789'
            },
            err: {
                code: 0,
                msg: '验证成功'
            }
        }
    } else {
        resData = {
            success: false,
            data: {},
            err: {
                code: 1,
                msg: '验证失败'
            }
        }
    }
    return resData
};

// 当拦截到匹配url的请求时，函数checkLogin将被执行，并把执行结果作为响应数据返回
// post代表拦截的请求类型
Mock.mock(`${BASE_URL}/user/login`, 'post', checkLogin)