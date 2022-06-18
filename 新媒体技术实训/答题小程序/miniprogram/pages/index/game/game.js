// pages/index/game/game.js
var app = getApp();
require('../../../lib/binding.js');
import {
    addScore
} from '../../../service/score';

import {
    getUserInfoById
} from '../../../service/user';
Page({
    data: {
        userInfo: {},
        scoreInfo: {
            username: "",
            userid: "",
            score: ""
        },
        seconds: 0,
        time: '00:00:00',
        cost: 0,
        question: [],
        rightanswer: [],
        answer: [],
        showresult: 0,
        questionnum: 0,
        maxScore: wx.getStorageSync('maxScore') || 999,
        timebegin: 0
    },

    onLoad() {
        this.loadquestion(); // 加载题目
        charging(this);
        timing(this);
        if (app.globalData.userInfo) { // 获取当前用户信息，用于存储最后成绩
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
            getUserInfoById(this.data.userInfo.id).then((res) => {
                this.setData({
                    userInfo: res.data.data,
                    hasUserInfo: true
                })
            })
        } else {
            wx.redirectTo({
                url: '../welcome/welcome',
            })
        }
    },

    listenerUserInput(e) {
        this.data.answer = e.detail.value;
    },

    modalcnt(s, that) {
        wx.showModal({
            title: '游戏结束',
            content: s < that.data.maxScore ? '新记录！！你的时间：' + s + ' 秒' : '你的时间：' + s + ' 秒，最高记录：' + that.data.maxScore + ' 秒',
            showCancel: false,
            success(res) {
                if (res.confirm) {
                    charging(that);
                    timing(that);
                    wx.navigateBack({
                        delta: 1
                    });
                }
                console.log(that.data.userInfo)
                that.setData({
                    'scoreInfo.username': that.data.userInfo.username,
                    'scoreInfo.userid': that.data.userInfo.id,
                    'scoreInfo.score': s
                })
                addScore(that.data.scoreInfo).then((res) => { // 在数据库插入成绩
                    console.log(res);
                })
            }
        })
    },

    loadquestion() {
        while (true) {
            var a = this.question()
            console.log(a);
            var b = this.validate(a.num1, a.op, a.num2)
            console.log(b);
            if(b == true) {
                break;
            }
        }

        var newquestion = a.num1 + " " + a.op + " " + a.num2 + " =";
        var rightanswer = wx.binding.eval(a.num1 + (a.opTemp) + a.num2); //  用binding插件进行运算
        this.setData({
            question: newquestion,
            rightanswer: rightanswer
        })
    },

    question() {
        var num1 = Math.floor(Math.random() * 11);
        var num2 = Math.floor(Math.random() * 11);
        var arr = ['+', '-', '×', '÷'];
        var op = arr[Math.floor(Math.random() * arr.length)];
        var opTemp = op;
        if (op === '×') opTemp = '*';
        if (op === '÷') opTemp = '/';
        return {
            num1,
            op,
            opTemp,
            num2
        }
    },

    validate(num1, op, num2) {
        if (op === '÷' && num2 === 0) return false; // 不能除以0
        if (num1 % num2 != 0) return false; // 必须除尽
        if (op === '-' && num1 < num2) return false; // 差必须大于0
        return true;
    },

    listenerUserInput(e) {
        this.data.answer = e.detail.value;
    },

    check() {
        if (this.data.rightanswer == this.data.answer) {
            console.log('答案正确');
            // if (this.data.questionnum < 9) {
            if (this.data.questionnum < 2) {
                this.setData({
                    questionnum: this.data.questionnum + 1,
                    showresult: 1,
                    answer: []
                })
                this.loadquestion();
            } else {
                var now = new Date();
                var leave = (now.getTime() - this.data.timebegin.getTime()) / 1000;
                this.modalcnt(leave, this);

                let newMaxScore = Math.min(leave, this.data.maxScore);
                wx.setStorageSync('maxScore', newMaxScore);
                this.data.maxScore = newMaxScore;
                this.setData({
                    showresult: 0
                })
            }
        } else {
            console.log('答案错误');
            // if (this.data.questionnum < 9) {
                if (this.data.questionnum < 2) {
                this.setData({
                    showresult: 2,
                    answer: []
                })
            } else {
                var now = new Date();
                var leave = (now.getTime() - this.data.timebegin.getTime()) / 1000;
                this.modalcnt(leave, this);
                let newMaxScore = Math.min(leave, this.data.maxScore);
                wx.setStorageSync('maxScore', newMaxScore);
                this.data.maxScore = newMaxScore;
                this.setData({
                    showresult: 0
                })
            }
        }
    },

    comfirm() {
        if (this.data.questionnum < 9) {
            this.setData({
                showresult: false
            })
        } else {
            this.setData({
                showresult: 0
            })
        }
    }
})

function formatSeconds(that) {
    var mins = 0,
        hours = 0,
        seconds = that.data.seconds
    if (seconds < 60) {
        seconds = seconds
    } else if (seconds < 3600) {
        mins = parseInt(seconds / 60)
        seconds = seconds % 60
    } else {
        mins = parseInt(seconds / 60)
        seconds = seconds % 60
        hours = parseInt(mins / 60)
        mins = mins % 60
    }
    that.setData({
        time: formatTime(hours) + ':' + formatTime(mins) + ':' + formatTime(seconds)
    });
}

function formatTime(num) {
    if (num < 10)
        return '0' + num
    else
        return num + ''
}

function timing(that) {
    var seconds = that.data.seconds
    if (seconds > 21599) {
        that.setData({
            time: '6小时，不想继续了'
        });
        return;
    }
    if (that.data.status == 1) {
        setTimeout(function () {
            that.setData({
                seconds: seconds + 1
            });
            timing(that);
        }, 1000)
        formatSeconds(that)
    }
}

function charging(that) {
    that.data.timebegin = new Date();
    that.data.status = 1;
    if (that.data.seconds < 600) {
        that.data.cost = 1
    }
}