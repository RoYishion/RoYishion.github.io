// pages/mine/mine.js
const app = getApp()
import {
    getUserInfoById
} from '../../service/user';
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        show: [],
        funcInfo1: ['用户管理'],
        funcInfo2: ['角色管理'],
        funcInfo3: ['成绩管理'],
        funcInfo4: ['编辑资料'],
        funcInfo5: ['孩子答题记录']
    },

    userManage() {
        wx.navigateTo({
            url: '../mine/userManage/userManage'
        })
    },

    roleManage() {
        wx.navigateTo({
            url: '../mine/roleManage/roleManage'
        })
    },

    editData() {
        wx.navigateTo({
            url: '../mine/editData/editData'
        })
    },

    scoreManage() {
        wx.navigateTo({
            url: '../mine/scoreManage/scoreManage'
        })
    },

    childManage() {
        wx.navigateTo({
            url: '../mine/childManage/childManage'
        })
    },
    login() {
        wx.redirectTo({
            url: '../welcome/welcome'
        })
    },
    logout() {
        app.globalData.userInfo = null;
        wx.setStorageSync("sessionid", null);
        wx.redirectTo({
            url: '../welcome/welcome'
        })
    },
    onShow() {
        getUserInfoById(this.data.userInfo.id).then((res) => {
            this.setData({
                userInfo: res.data.data,
                hasUserInfo: true
            })
        })
    },
    onLoad() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
            getUserInfoById(this.data.userInfo.id).then((res) => {
                this.setData({
                    userInfo: res.data.data,
                    hasUserInfo: true
                })
            })
        } else {
            wx.redirectTo({
                url: '../welcome/welcome',
            })
        }
        if (this.data.userInfo.role_id) {
            this.setData({
                show: this.data.userInfo.role_id
            })
        } else {
            return;
        }
    }
})