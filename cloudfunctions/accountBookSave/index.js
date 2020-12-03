// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  let accountItemId = event.accountItemId
  let data = {
    name: event.name,
    total: event.total,
    type: event.type
  }
  switch (data.type) {
    case "credit-card":
      data.quota = event.quota;
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
