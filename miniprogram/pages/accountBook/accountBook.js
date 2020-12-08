const app = getApp()

Page({

    data: {
        totalAssets: 0.00,
        netAssets: 0.00,
        debtAssets: 0.00,
        accountList: [
        ],
        debtOut: 0.00,
        debtIn: 0.00,
    },

    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })
        //获取openid
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                console.log("success get openid : " + res.result.openid);
                app.globalData.openid = res.result.openid
                this.setData({
                    openid: res.result.openid
                })
                this.getAccountBook();
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '获取 openid 失败，请检查是否有部署 login 云函数',
                })
                console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
            }
        })
    },

    //获取用户账本
    getAccountBook: function () {
        this.setData({
            totalAssets: 0.00,
            netAssets: 0.00,
            debtAssets: 0.00,
            accountList: [],
            debtOut: 0.00,
            debtIn: 0.00,
        })
        wx.cloud.callFunction({
            name: "accountBookGet",
            data: {},
            success: res => {
                if (res.result.code !== 0) {
                    return wx.hideLoading({
                        complete: () => {
                            wx.showToast({
                                title: res.result.msg,
                            })
                        },
                    })
                }
                console.log("成功调用accountBookGet");
                console.log(res);
                this.setData(res.result.data);
                wx.hideLoading({
                    complete: (res) => {
                    },
                })
            },
            fail: err => {
                console.log(err);
                wx.hideLoading({
                    complete: (res) => {
                        wx.showToast({
                            title: '服务器故障',
                        })
                    },
                })
            }
        })
    },



})