import Mock from 'mockjs'
import * as mUtils from '@/util/mUtils'
const BASE_URL = process.env.VUE_APP_URL
const addressList = [
    {
        addressId: '1',
        userId: '1001',
        phone: '133812345678',
        name: '张三',
        province: '上海',
        city: '浦东区',
        address: '广从南路548号',
        zip: 202020
    },
    {
        addressId: '2',
        userId: '1002',
        phone: '133812345678',
        name: '李四',
        province: '北京',
        city: '天河区',
        address: '广从南路548号',
        zip: 202020
    },
    {
        addressId: '3',
        userId: '1003',
        phone: '133812345678',
        name: '王五',
        province: '广州',
        city: '黄埔',
        address: '广从南路548号',
        zip: 202020
    },
    {
        addressId: '4',
        userId: '1004',
        phone: '133812345678',
        name: '马六',
        province: '福建',
        city: '厦门区',
        address: '广从南路548号',
        zip: 202020
    },
]

// 获取用户地址
const getUserAddress = function(req) {///当前用户地址列表
    console.log(req)
    const {userId} = mUtils.param2Obj(req.url)
    let resData = null;
    let userAddressList = []
    for(let i = 0; i < addressList.length; i++) {
        if(userId == addressList[i].userId) {
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
const deleteAddress = function(req) {
    const {addressId} = mUtils.param2Obj(req.url)//将地址参数转为对象
    let resData = null;
    let checkBook = false;
    addressList.forEach((address, index) => {//找到当前地址对应数据 
        if(address.addressId == addressId) {//删除当前地址数据
            addressList.splice(index, 1)
            checkBook = true
        }
    })
    if(checkBook) {//返回对应数据
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
const editAddress = function(req) {
    let resData = null;
    const {
        addressId,
        phone,
        name,
        province,
        city,
        address,
        zip
    } = JSON.parse(req.body)//获取前端页面传入的参数
    resData = {
        success: false,
        data: {},
        err: {
            code: 1,
            msg: '信息不完整，修改失败'
        }
    }
    if(addressId) {//更新地址列表中对应当前地址的信息
        for(let i = 0; i < addressList.length; i++) {
            if(addressList[i].addressId == addressId) {
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
const addAddress = function(req) {
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
    } = JSON. parse(req.body)//新增用户信息
    if(userId) {
        // 以时间作为唯一id
        addObj.addressId = Number(Date.now());
        addObj.userId = userId ;
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
                msg:'添加成功'
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
// RegExp 对象表示正则表达式，用来对字符串执行模式匹配
Mock.mock(RegExp(`${BASE_URL}/user/address` + '.*'), 'get', getUserAddress)
Mock.mock(RegExp(`${BASE_URL}/user/address` + '.*'), 'delete', deleteAddress)
Mock.mock(`${BASE_URL}/user/address`, 'put' , editAddress)
Mock.mock(`${BASE_URL}/user/address`, 'post', addAddress)