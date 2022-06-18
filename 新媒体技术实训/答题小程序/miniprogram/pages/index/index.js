const app = getApp()
Page({
  data: {
    rules: false
  },

  rulesshowbox() {
    this.setData({
      rules: true
    })
  },

  closerulesbox() {
    this.setData({
      rules: false
    })
  },

  mathgame() {
    wx.navigateTo({
      url: "/pages/index/game/game"
    });
  },

  list() {
    wx.navigateTo({
      url: "/pages/index/list/list"
    });
  }
})