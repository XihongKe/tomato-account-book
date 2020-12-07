// 云函数入口文件
const cloud = require('wx-server-sdk')
const Joi = require('joi')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // 验证器
  const {error, value} = Joi.object().keys({
    name: Joi.string().min(1, "utf8"),
    total: Joi.number().positive().precision(2),
    quota: Joi.number().positive().precision(2),
    type: Joi.string(),
    t: Joi.number()
  }).validate({
    name: event.name,
    total: event.total,
    type: event.type,
    quota: event.quota,
    t: "字符串"
  });
  console.log(error);
  console.log(value);
  if (error !== undefined) {
    return {
      code: -1,
      msg: "参数非法：" + error.message
    }
  }
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
        type: event.type,
      }
      break;
    default:
      return {
        code: -1,
        msg: "账本类型非法"
      }
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
