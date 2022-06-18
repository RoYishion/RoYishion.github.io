// pages/mine/editData/editData.js
const app = getApp()
import {
    updateUser
} from "../../../service/user";
Page({
    data: {
        userForm: {
            id: "",
            username: "",
            phone: ""
        },
        oldPhoneForm: {
            oldPhone: ''
        },
        
    },

    edit() {
        const userForm2 = [];
        userForm2.push(this.data.userForm);
        userForm2.push(this.data.oldPhoneForm);
        updateUser(userForm2).then((res) => {
            console.log(res);
            wx.navigateBack({
              delta: 1
            })
        })
    },

    getUserName(e) {
        console.log('用户名', e.detail.value)
        this.setData({
            'userForm.username': e.detail.value
        })
    },

    getPhone(e) {
        console.log('手机号', e.detail.value)
        this.setData({
            'userForm.phone': e.detail.value
        })
    },
    onLoad() {
        this.setData({
            'userForm.id': app.globalData.userInfo.id,
            'userForm.username': app.globalData.userInfo.username,
            'userForm.phone': app.globalData.userInfo.phone,
            'oldPhoneForm.oldPhone': app.globalData.userInfo.phone
        })
    }
})