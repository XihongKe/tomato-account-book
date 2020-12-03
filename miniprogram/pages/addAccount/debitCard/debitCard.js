// miniprogram/pages/addAccount/debitCard.js
import _ from "../../../lib/lodash.min"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        total: 0.00,
        name: "",
        id: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({"id": _.get(options, "id", "")});
        this.setData({"name": _.get(options, "name", "")});
        this.setData({"total": _.get(options, "total", "")});
    },

    onSave: function () {
        if (this.data.name === "" || this.data.total == 0) {
            return wx.showToast({
                title: '请输入银行名称和余额',
            })
        }
        wx.cloud.callFunction({
            name: 'accountBookSave',
            data: {
                accountItemId: this.data.id,
                name: this.data.name,
                total: this.data.total,
                type: 'debit-card'
            },
            success: res => {
                wx.showToast({
                    title: '保存成功',
                    icon: "success",
                    duration: 1000,
                    complete: function () {
                        setTimeout(() => {
                            wx.redirectTo({
                                url: "/pages/accountBook/accountBook"
                            })
                        }, 1000);
                    }
                })
                console.log(res);
            },
            fail: err => {
                console.log("调用失败");
                console.log(err);
            }
        });
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