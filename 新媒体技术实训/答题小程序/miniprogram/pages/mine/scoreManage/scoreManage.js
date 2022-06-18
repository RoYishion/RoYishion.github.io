// pages/mine/scoreManage/scoreManage.js
import {
    getScoreList,
    deleteScore
} from '../../../service/score';
Page({
    data: {
        scoreList: []
    },

    formatting(list) {  // 排序
        function sortData(a, b) {
            return a.score - b.score
        }
        list.sort(sortData);
        return list;
    },

    onLoad() {
        getScoreList().then((res) => {
            console.log(res);
            if (res.data.success) {
                this.setData({
                    scoreList: this.formatting(res.data.data.result),
                })
            }
        })
    },

    onShow() {
        getScoreList().then((res) => {
            console.log(res);
            if (res.data.success) {
                this.setData({
                    scoreList: this.formatting(res.data.data.result),
                })
            }
        })
    },

    deleteScore(e) {
        var id = e.currentTarget.dataset.id;
        deleteScore(id).then((res) => {
            wx.redirectTo({
                url: '../scoreManage/scoreManage'
            })
        })
    }
})