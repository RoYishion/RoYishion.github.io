// pages/welcome/register/register.js
import {
    registerUser
} from '../../../service/user';
Page({
    data: {
        password1: "",
        password2: "",
        registerForm: {
            username: "",
            phone: "",
            password: "",
            role_id: 3
        }
    },

    //  获取输入的用户名
    getusername(event) {
        console.log('用户名', event.detail.value)
        this.setData({
            'registerForm.username': event.detail.value
        })
    },

    //  获取输入的手机号
    getphone(event) {
        console.log('手机号', event.detail.value)
        this.setData({
            'registerForm.phone': event.detail.value
        })
    },

    //  获取第一次输入的密码
    getpassword1(event) {
        console.log('密码1', event.detail.value)
        this.setData({
            password1: event.detail.value
        })
    },

    //  获取第二次输入的密码
    getpassword2(event) {
        console.log('密码2', event.detail.value)
        this.setData({
            password2: event.detail.value
        })
    },

    register() {
        if (this.data.password1 == this.data.password2) {
            this.setData({
                'registerForm.password': this.data.password1
            })
            registerUser(this.data.registerForm).then(res => {
                console.log(res);
                if(res.data.success) {
                    wx.showModal({
                        title: '注册成功',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        }
                    })
                } else {
                    wx.showToast({
                        title: '注册失败，' + res.data.err.msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        } else {
            wx.showToast({
                title: '两次的密码输入不一致',
                icon: 'none',
                duration: 2000
            })
        }
    }
})