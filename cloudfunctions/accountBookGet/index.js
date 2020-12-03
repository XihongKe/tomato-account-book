// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// TODO 获取账本
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    code: 0,
    msg: "success",
    data: {
      totalAssets: 0.00,
      netAssets: 0.00,
      debtAssets:0.00,
      accountList : [],
      debtOut: 0.00,
      debtIn: 0.00,
    }
  }
}