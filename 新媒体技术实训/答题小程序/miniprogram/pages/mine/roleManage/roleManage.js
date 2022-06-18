// pages/mine/roleManage/roleManage.js
import {
    getAllRoles,
    addRole,
    updateRole,
    deleteRole
} from "../../../service/role";

Page({
    data: {
        listData: [],
        inputModel: false,
        roleForm: {
            rolename: "",
            role_id: ""
        },
        comfirmType: ""
    },

    add() {
        this.setData({
            inputModel: true,
            comfirmType: 1
        })
    },

    getRoleName(e) {
        console.log('角色名', e.detail.value)
        this.setData({
            'roleForm.rolename': e.detail.value
        })
    },

    getRoleId(e) {
        console.log('角色id', e.detail.value)
        this.setData({
            'roleForm.role_id': e.detail.value
        })
    },

    editRole(e) {
        var id = e.currentTarget.dataset.id;
        var rolename = e.currentTarget.dataset.rolename;
        var role_id = e.currentTarget.dataset.role_id;
        this.setData({
            'roleForm.id': id,
            'roleForm.rolename': rolename,
            'roleForm.role_id': role_id,
            inputModel: true,
            comfirmType: 2
        })
    },

    deleteRole(e) {
        var id = e.currentTarget.dataset.id;
        deleteRole(id).then((res) => {
            wx.redirectTo({
                url: '../roleManage/roleManage'
            })
        })
    },

    handlestoreCodeOK() {
        if (this.data.comfirmType == 1) {
            addRole(this.data.roleForm).then((res) => {
                wx.redirectTo({
                    url: '../roleManage/roleManage'
                })
            })
        } else {
            updateRole(this.data.roleForm).then((res) => {
                wx.redirectTo({
                    url: '../roleManage/roleManage'
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
        getAllRoles().then((res) => {
            this.setData({
                listData: res.data.data.result
            })
        });
    },

    onLoad() {
        getAllRoles().then((res) => {
            this.setData({
                listData: res.data.data.result
            })
        });
    }
})