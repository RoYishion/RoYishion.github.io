import {
    LOGIN,
    SAVEUSER,
    REGISTERUSER,
    DELETEUSER,
    UPDATEUSER,
    GETALLUSER,
    GETUSERINFOBYID
} from "./api";

export function login(params) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${LOGIN}`,
            method: 'POST',
            data: {
                phone: params.phone,
                password: params.password
            },
            success: (res) => {
                resolve(res);
            },
            fail: (res) => {
                reject(res);
            }
        })
    })
}

export function getAllUser() {
    var header = {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("sessionid")
    };
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${GETALLUSER}`,
            method: 'POST',
            header: header,
            success: (res) => {
                resolve(res);
            },
            fail: (res) => {
                reject(res);
            }
        })
    })
}

export function addUser(params) {
    var header = {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("sessionid")
    };
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${SAVEUSER}`,
            method: 'POST',
            data: params,
            header: header,
            success: (res) => {
                resolve(res);
            },
            fail: (res) => {
                reject(res);
            }
        })
    })
}

export function registerUser(params) {
    var header = {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("sessionid")
    };
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${REGISTERUSER}`,
            method: 'POST',
            data: params,
            header: header,
            success: (res) => {
                resolve(res);
            },
            fail: (res) => {
                reject(res);
            }
        })
    })
}

export function deleteUser(params) {
    var header = {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("sessionid")
    };
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${DELETEUSER}/${params}`,
            method: 'DELETE',
            header: header,
            success: (res) => {
                resolve(res);
            },
            fail: (res) => {
                reject(res);
            }
        })
    })
}

export function updateUser(params) {
    var header = {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("sessionid")
    };
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${UPDATEUSER}`,
            method: 'POST',
            data: params,
            header: header,
            success: (res) => {
                resolve(res);
            },
            fail: (res) => {
                reject(res);
            }
        })
    })
}

export function searchUser(params) {
    var header = {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("sessionid")
    };
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${GETALLUSER}`,
            method: 'POST',
            data: params,
            header: header,
            success: (res) => {
                resolve(res);
            },
            fail: (res) => {
                reject(res);
            }
        })
    })
}

export function getUserInfoById(params) {
    var header = {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("sessionid")
    };
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${GETUSERINFOBYID}/${params}`,
            method: 'GET',
            header: header,
            success: (res) => {
                resolve(res);
            },
            fail: (res) => {
                reject(res);
            }
        })
    })
}