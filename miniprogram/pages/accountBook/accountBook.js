// pages/databaseGuide/databaseGuide.js

const app = getApp()

Page({

  data: {
    totalAssets: 0.00,
    netAssets: 0.00,
    debtAssets:0.00,
    accountList : [
      // {
      //   name : "现金",
      //   total: 20.56,
      //   childAccountList : []
      // },
      // {
      //   name : "储蓄卡",
      //   total: 20.56,
      //   childAccountList : [
      //     {name: "中国银行", total: "10"},
      //     {name: "浦发银行", total: "10.56"},
      //   ]
      // },
    ],
    debtOut: 0.00,
    debtIn: 0.00,
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
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

  getAccountBook: function(){
    wx.cloud.callFunction({
      name: "accountBookGet",
      data: {},
      success: res => {
        console.log("成功调用accountBookGet");
        console.log(res);
        this.setData(res.data);
        wx.hideLoading({
          complete: (res) => {},
        })
      },
      fail: err => {
        console.log(err);
        wx.hideLoading({
          complete: (res) => {wx.showToast({
            title: '服务器故障',
          })},
        })
      }
    })
  },

  onAdd: function () {
    // const db = wx.cloud.database()
    // db.collection('counters').add({
    //   data: {
    //     count: 1
    //   },
    //   success: res => {
    //     // 在返回结果中会包含新创建的记录的 _id
    //     this.setData({
    //       counterId: res._id,
    //       count: 1
    //     })
    //     wx.showToast({
    //       title: '新增记录成功',
    //     })
    //     console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '新增记录失败'
    //     })
    //     console.error('[数据库] [新增记录] 失败：', err)
    //   }
    // })
  },

  onQuery: function() {
    // const db = wx.cloud.database()
    // // 查询当前用户所有的 counters
    // db.collection('counters').where({
    //   _openid: this.data.openid
    // }).get({
    //   success: res => {
    //     this.setData({
    //       queryResult: JSON.stringify(res.data, null, 2)
    //     })
    //     console.log('[数据库] [查询记录] 成功: ', res)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
  },

  onCounterInc: function() {
    // const db = wx.cloud.database()
    // const newCount = this.data.count + 1
    // db.collection('counters').doc(this.data.counterId).update({
    //   data: {
    //     count: newCount
    //   },
    //   success: res => {
    //     this.setData({
    //       count: newCount
    //     })
    //   },
    //   fail: err => {
    //     icon: 'none',
    //     console.error('[数据库] [更新记录] 失败：', err)
    //   }
    // })
  },

  onCounterDec: function() {
    // const db = wx.cloud.database()
    // const newCount = this.data.count - 1
    // db.collection('counters').doc(this.data.counterId).update({
    //   data: {
    //     count: newCount
    //   },
    //   success: res => {
    //     this.setData({
    //       count: newCount
    //     })
    //   },
    //   fail: err => {
    //     icon: 'none',
    //     console.error('[数据库] [更新记录] 失败：', err)
    //   }
    // })
  },

  onRemove: function() {
    // if (this.data.counterId) {
    //   const db = wx.cloud.database()
    //   db.collection('counters').doc(this.data.counterId).remove({
    //     success: res => {
    //       wx.showToast({
    //         title: '删除成功',
    //       })
    //       this.setData({
    //         counterId: '',
    //         count: null,
    //       })
    //     },
    //     fail: err => {
    //       wx.showToast({
    //         icon: 'none',
    //         title: '删除失败',
    //       })
    //       console.error('[数据库] [删除记录] 失败：', err)
    //     }
    //   })
    // } else {
    //   wx.showToast({
    //     title: '无记录可删，请见创建一个记录',
    //   })
    // }
  },


})