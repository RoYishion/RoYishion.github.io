import {
    GETSCORELIST,
    DELETESCORE,
    SAVESCORE
} from "./api";

export function getScoreList() {
    var header = {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("sessionid")
    };
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${GETSCORELIST}`,
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

export function addScore(params) {
    var header = {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("sessionid")
    };
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${SAVESCORE}`,
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

export function deleteScore(params) {
    var header = {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("sessionid")
    };
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${DELETESCORE}/${params}`,
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