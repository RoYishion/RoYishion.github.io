// pages/mine/userManage/userManage.js
import {
    getAllUser,
    addUser,
    deleteUser,
    updateUser
} from "../../../service/user";
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

Page({
    data: {
        listData: [],
        inputModel: false,
        userForm: {
            username: "",
            phone: "",
            role_id: ""
        },
        oldPhoneForm: {
            oldPhone: ''
        },
        roleOptions: [],
        comfirmType: "",
        show: false
    },

    getUserName(e) {  // 动态获取输入的新增用户名
        console.log('用户名', e.detail.value)
        this.setData({
            'userForm.username': e.detail.value
        })
    },

    getPhone(e) {  // 动态获取输入的新增用户手机号
        console.log('手机号', e.detail.value)
        this.setData({
            'userForm.phone': e.detail.value
        })
    },

    showPopup() {  // 弹出下拉框
        this.setData({
            show: true
        });
    },

    onClose() {  // 关闭下拉框
        this.setData({
            show: false
        });
    },

    onConfirm(event) {  // 点击确定
        const {
            value,
            index
        } = event.detail;
        Toast(`当前值：${value}, 当前索引：${index}`);
        console.log(value);
        console.log(index);
        console.log(value.role_id);
        this.setData({
            show: false,
            'userForm.role_id': value.role_id
        });
    },

    onCancel() {  // 点击取消
        Toast('取消');
        console.log('取消');
        this.setData({
            show: false
        });
        console.log(this.data.show);
    },

    add() {  // 弹出新增用户弹框
        this.setData({
            'userForm.username': '',
            'userForm.phone': '',
            'userForm.role_id': '',
            inputModel: true,
            comfirmType: 1
        })
    },

    editUser(e) {  // 弹出编辑用户弹框
        var id = e.currentTarget.dataset.id;
        var username = e.currentTarget.dataset.username;
        var phone = e.currentTarget.dataset.phone;
        var role_id = e.currentTarget.dataset.role_id;
        this.setData({
            'userForm.id': id,
            'userForm.username': username,
            'userForm.phone': phone,
            'userForm.role_id': role_id,
            'oldPhoneForm.oldPhone': phone,
            inputModel: true,
            comfirmType: 2
        })
    },

    deleteUser(e) {
        var id = e.currentTarget.dataset.id;
        deleteUser(id)
            .then((res) => {
                wx.redirectTo({
                    url: '../userManage/userManage'
                })
            })
    },

    handlestoreCodeOK() {
        if (this.data.comfirmType == 1) {
            addUser(this.data.userForm).then((res) => {
                wx.redirectTo({
                    url: '../userManage/userManage'
                })
            })
        } else {
            const userForm2 = [];
            userForm2.push(this.data.userForm);
            userForm2.push(this.data.oldPhoneForm);
            updateUser(userForm2).then((res) => {
                wx.redirectTo({
                    url: '../userManage/userManage'
                })
            })
        }
    },

    handlestoreCodeNo() {
        this.setData({
            inputModel: false
        })
    },

    onShow() {
        getAllUser().then((res) => {
            console.log(res);
            console.log(res.data.data.roles);
            this.setData({
                listData: res.data.data.searchUsers,
                roleOptions: res.data.data.roles
            })
        });
    },

    onLoad() {
        getAllUser().then((res) => {
            this.setData({
                listData: res.data.data.searchUsers,
                roleOptions: res.data.data.roles
            })
        });
    }
})