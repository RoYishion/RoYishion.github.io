// pages/mine/childManage/childManage.js
const app = getApp();
import {
    getAllRelations,
    addRelation
} from '../../../service/relation';
import {
    login
} from '../../../service/user';
Page({
    data: {
        list: [],
        userForm: {
            phone: "",
            password: ""
        },
        inputModel: false,
        icon: "../../../images/bar_mine.png"
    },

    onShow() {
        getAllRelations(app.globalData.userInfo.id).then((res) => {
            console.log(res.data.data.result);
            if (res.data) {
                this.setData({
                    list: res.data.data.result.score2
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: '暂时没有数据',
                    showCancel: false,
                    success(res) {
                        if (res.confirm) {
                            wx.navigateBack({
                                delta: 1
                            })
                        }
                    }
                })
            }
        });
    },

    add() {
        this.setData({
            inputModel: true
        })
    },

    getPhone(e) {
        console.log('手机号', e.detail.value)
        this.setData({
            'userForm.phone': e.detail.value
        })
    },

    getPassword(e) {
        console.log('密码', e.detail.value)
        this.setData({
            'userForm.password': e.detail.value
        })
    },

    handlestoreCodeOK() {
        login(this.data.userForm).then(res => {
            if (res.data.success) {
                if (res.data.data.user.role_id == 3) {
                    const form = {
                        parantid: app.globalData.userInfo.id,
                        childid: res.data.data.user.id
                    }
                    addRelation(form).then((res) => {
                        console.log(res);
                        wx.redirectTo({
                            url: '../childManage/childManage',
                        })
                    })
                } else {
                    wx.showToast({
                        title: '你输入的账户不是学生用户',
                        icon: 'none',
                        duration: 2000
                    })
                }


            } else {
                wx.showToast({
                    title: res.data.err.msg,
                    icon: 'none',
                    duration: 2000
                })
            }
        });
    },

    handlestoreCodeNo() {
        this.setData({
            inputModel: false
        })
    },
})