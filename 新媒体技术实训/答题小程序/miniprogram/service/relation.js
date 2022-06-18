import {
    GETALLRELATIONS,
    ADDRELATION,
    DELETERELATION
} from "./api";

export function getAllRelations(params) {
    var header = {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("sessionid")
    };
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${GETALLRELATIONS}/${params}`,
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

export function addRelation(params) {
    var header = {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("sessionid")
    };
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${ADDRELATION}`,
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

export function deleteRelation(params) {
    var header = {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("sessionid")
    };
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${DELETERELATION}/${params}`,
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