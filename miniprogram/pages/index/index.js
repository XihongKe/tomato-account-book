//index.js
const app = getApp()

Page({
    data: {
        userKey: "",
        key: "pwd1024"
    },

    onLoad: function () {
        return wx.reLaunch({
            url: '/pages/accountBook/accountBook'
        })
        this.setData({
            userKey: wx.getStorageSync("index_user_key")
        })
        if(this.data.userKey !== ""){
            this.onSave()
        }
    },

    //校验应用密码
    onSave: function () {
        if (this.data.userKey === this.data.key) {
            wx.setStorage({
                key: "index_user_key",
                data: this.data.userKey
            })
            return wx.reLaunch({
                url: '/pages/accountBook/accountBook'
            })
        }
        wx.showToast({
            title: "密码错误",
            icon: "none",
            duration: 1000
        })
    }
})
