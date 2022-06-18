import Mock from 'mockjs'
import * as mUtils from '@/util/mUtils'
const BASE_URL = process.env.VUE_APP_URL
const addressList = [
    {
        addressId: '1',
        userId: '1001',
        phone: '13381234567',
        name: '张三',
        province: '上海',
        city: '浦东区',
        address: '广从南路548号',
        zip: 1234
    }
]

// 获取用户地址
const getUserAddress = function (req) {
    console.log(req)
    const { userId } = mUtils.param2Obj(req.url)
    let resData = null;
    let userAddressList = []
    for (let i = 0; i < addressList.length; i++) {
        if (userId == addressList[i].userId) {
            userAddressList.push(addressList[i])
        }
    }
    resData = {
        success: true,
        data: {
            userAddressList
        },
        err: {
            code: 0,
            msg: '验证成功'
        }
    }
    return resData;
};

// 删除地址
const deleteAddress = function (req) {
    const { addressId } = mUtils.param2Obj(req.url) //  将地址参数转为对象
    let resData = null;
    let checkBook = false;
    addressList.forEach((address, index) => {
        if (address.addressId == addressId) {
            addressList.splice(index, 1)
            checkBook = true
        }
    })
    if (checkBook) {
        resData = {
            success: true,
            data: {},
            err: {
                code: 0,
                msg: '删除成功'
            }
        }
    } else {
        resData = {
            success: false,
            data: {},
            err: {
                code: 1,
                msg: '地址信息有误，无法删除'
            }
        }
    }
    return resData;
}

// 编辑地址
const editAddress = function (req) {
    let resData = null;
    const {
        addressId,
        phone,
        name,
        province,
        city,
        address,
        zip
    } = JSON.parse(req.body)
    resData = {
        success: false,
        data: {},
        err: {
            code: 1,
            msg: '信息不完整，修改失败'
        }
    }
    if (addressId) {
        for (let i = 0; i < addressList.length; i++) {
            if (addressList[i].addressId == addressId) {
                addressList[i].phone = phone;
                addressList[i].name = name;
                addressList[i].province = province;
                addressList[i].city = city;
                addressList[i].address = address;
                addressList[i].zip = zip;
                resData = {
                    success: true,
                    data: {},
                    err: {
                        code: 0,
                        msg: '修改成功'
                    }
                }
            }
        }
    }
    return resData;
}

// 新增地址
const addAddress = function (req) {
    let resData = null;
    let addObj = {};
    const {
        userId,
        phone,
        name,
        province,
        city,
        address,
        zip
    } = JSON.parse(req.body)
    if (userId) {
        // 以时间作为唯一id
        addObj.addressId = Number(Date.now());
        addObj.userId = userId;
        addObj.phone = phone;
        addObj.name = name;
        addObj.province = province;
        addObj.city = city;
        addObj.address = address;
        addObj.zip = zip;
        addressList.push(addObj);
        resData = {
            success: true,
            data: {},
            err: {
                code: 0,
                msg: '添加成功'
            }
        }
    } else {
        resData = {
            success: false,
            data: {},
            err: {
                code: 1,
                msg: '信息不完整，添加失败'
            }
        }
    }
    return resData;
}

Mock.mock(RegExp(`${BASE_URL}/user/address` + '.*'), 'get', getUserAddress)
Mock.mock(RegExp(`${BASE_URL}/user/address` + '.*'), 'delete', deleteAddress)
Mock.mock(`${BASE_URL}/user/address`, 'put', editAddress)
Mock.mock(`${BASE_URL}/user/address`, 'post', addAddress)
// 拦截的地址，拦截的请求类型，执行函数并返回
// RegExp 对象表示正则表达式，用来对字符串执行模式匹配