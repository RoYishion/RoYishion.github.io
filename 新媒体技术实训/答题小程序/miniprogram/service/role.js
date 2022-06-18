import {
  GETALLROLES,
  SAVEROLE,
  DELETEROLE,
  UPDATEROLE
} from "./api";

export function getAllRoles() {
  var header = {
    'content-type': 'application/json',
    'Authorization': wx.getStorageSync("sessionid")
  };
  return new Promise(function (resolve, reject) {
    wx.request({
      url: `${GETALLROLES}`,
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

export function addRole(params) {
  var header = {
    'content-type': 'application/json',
    'Authorization': wx.getStorageSync("sessionid")
  };
  return new Promise(function (resolve, reject) {
    wx.request({
      url: `${SAVEROLE}`,
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

export function deleteRole(params) {
  var header = {
    'content-type': 'application/json',
    'Authorization': wx.getStorageSync("sessionid")
  };
  return new Promise(function (resolve, reject) {
    wx.request({
      url: `${DELETEROLE}/${params}`,
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

export function updateRole(params) {
  var header = {
    'content-type': 'application/json',
    'Authorization': wx.getStorageSync("sessionid")
  };
  return new Promise(function (resolve, reject) {
    wx.request({
      url: `${UPDATEROLE}`,
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