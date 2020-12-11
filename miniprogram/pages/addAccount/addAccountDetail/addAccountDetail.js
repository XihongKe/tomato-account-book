// miniprogram/pages/addAccount/debitCard.js
import _ from "../../../lib/lodash.min"
import {AccountSetting} from "../../../lib/accountSetting"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        type: "",
        accountSettings: []
    },

    bindinput: function () {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({"type": _.get(options, "type", "")})
        this.setData({"id": _.get(options, "id", "")});
        this.setData({"accountSettings": AccountSetting.getSetting(this.data.type).data})
        for (let index in this.data.accountSettings) {
            let key = this.data.accountSettings[index].key;
            this.setData({
                    ["accountSettings[" + index + "].value"]: _.get(options, key)
                }
            )
        }
        wx.setNavigationBarTitle({title: AccountSetting.getTypeCN(this.data.type)})
    },

    onSave: function (event) {
        wx.showLoading({
            title: "加载中",
            mask: true,
        });

        //组装请求体
        let data = {
            accountItemId: this.data.id,
            type: this.data.type
        }
        for (let i in event.detail.value){
            if (event.detail.value[i] === undefined){
                wx.hideLoading();
                return wx.showToast({
                    title: '请检查数据是否正确填写',
                })
            }
            data[i] = event.detail.value[i]
        }

        //发起请求
        wx.cloud.callFunction({
            name: 'accountBookSave',
            data: data,
            success: res => {
                wx.hideLoading();
                if (res.result.code !== 0) {
                    return wx.showToast({
                            title: res.result.msg,
                            icon: "none",
                            duration: 2000,
                        }
                    );
                }
                wx.showToast({
                    title: '保存成功',
                    icon: "success",
                    mask: true,
                    duration: 1000,
                    complete: function () {
                        setTimeout(() => {
                            wx.reLaunch({
                                url: '/pages/accountBook/accountBook'
                            })
                        }, 1000);
                    }
                })
                console.log(res);
            },
            fail: err => {
                wx.hideLoading();
                wx.showToast({
                        title: '保存失败:' + _.get(err, "result.data.msg", "服务器故障"),
                        icon: "none",
                        duration: 1000,
                    }
                );
                console.log("调用失败");
                console.log(err);
            }
        });
    },

    onDel: function () {
        let id = this.data.id
        wx.showModal({
            title: "确认删除吗？",
            content: "删除后数据无法恢复",
            success: function (confirm) {
                if (!confirm) {
                    return;
                }
                wx.cloud.callFunction({
                    name: "accountBookDel",
                    data: {
                        accountItemId: id
                    },
                    success: res => {
                        if (res.result.code !== 0) {
                            return wx.showToast({
                                title: _.get(res, "result.msg", "服务器故障"),
                                icon: "none"
                            })
                        }
                        wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 1000,
                            complete: function () {
                                setTimeout(() => {
                                    wx.reLaunch({
                                        url: "/pages/accountBook/accountBook"
                                    })
                                }, 1000)
                            }
                        })
                    },
                    fail: err => {
                        console.log("调用失败");
                        console.log(err);
                    }
                })
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})