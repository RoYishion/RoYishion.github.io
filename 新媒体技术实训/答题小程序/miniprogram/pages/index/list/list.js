// pages/index/list/list.js
import {
    getScoreList
} from '../../../service/score';
Page({
    data: {
        list: [],
        icon: "../../../images/bar_mine.png"
    },

    formatting(list) {  // 去重，排序
        function sortData(a, b) {
            return a.score - b.score
        }
        list.sort(sortData);
        var result = [];
        var obj = {};
        for (var i = 0; i < list.length; i++) {
            if (!obj[list[i].userid]) {
                result.push(list[i]);
                obj[list[i].userid] = true;
            }
        }
        return result;
    },

    onShow() {
        getScoreList().then((res) => {
            if (res.data.success) {
                this.setData({
                    list: this.formatting(res.data.data.result),
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: '暂时没有数据',
                    showCancel: false,
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                            wx.navigateBack({
                                delta: 1
                            })
                        }
                    }
                })
            }
        });
    }
})