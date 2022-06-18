const app = getApp();
import {
    login
} from '../../service/user';
Page({
    data: {
        loginForm: {
            phone: "",
            password: ""
        }
    },

    //  获取输入的手机号
    getphone(event) {
        console.log('账号', event.detail.value)
        this.setData({
            'loginForm.phone': event.detail.value
        })
    },

    //  获取输入的密码
    getpassword(event) {
        console.log('密码', event.detail.value)
        this.setData({
            'loginForm.password': event.detail.value
        })
    },

    login() {
        let phone = this.data.loginForm.phone;
        let password = this.data.loginForm.password;
        if (phone == '' || password == '') {
            wx.showToast({
                title: '用户或密码不能为空',
                icon: 'none',
                duration: 2000
            })
        } else {
            login(this.data.loginForm).then(res => {
                if (res.data.success) {
                    app.globalData.userInfo = res.data.data.user;
                    wx.setStorageSync("sessionid", res.data.data.token);
                    wx.switchTab({
                        url: '../index/index'
                    })
                } else {
                    wx.showToast({
                        title: res.data.err.msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
            });
        }
    },

    register() {
        wx.navigateTo({
            url: './register/register',
        })
    }
})