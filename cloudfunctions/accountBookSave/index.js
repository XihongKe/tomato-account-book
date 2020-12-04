// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  let accountItemId = event.accountItemId
  let data = {}
  switch (event.type) {
    case "credit-card":
      data = {
        _openid: wxContext.OPENID,
        name: event.name,
        total: event.total,
        type: event.type,
        quota: event.quota
      }
      break;
    case "debit-card":
    case "stored-card":
    case "online-paid":
    case "cash":
    case "receivable":
    case "payable":
      data = {
        _openid: wxContext.OPENID,
        name: event.name,
        total: event.total,
        type: event.type
      }
      break;
  }

  //更新
  if (accountItemId !== "") {
    return db.collection("accountBooks").where({
      _id: accountItemId,
      _openid: wxContext.OPENID,
    }).update({
      data: data
    }).then(res => {
      return {
        code: 0,
        msg: "success"
      }
    }).catch(err => {
      return {
        code: -1,
        msg: "更新失败",
        data: err
      }
    })
  }
  return db.collection("accountBooks").add({
    data: data
  }).then(res => {
    return {
      code: 0,
      msg: "success"
    }
  }).catch(err => {
    return {
      code: -1,
      msg: "添加失败",
      data: err
    }
  })

}
