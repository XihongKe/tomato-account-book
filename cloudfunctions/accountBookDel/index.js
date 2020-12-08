// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 删除用户账户
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let accountItemId = event.accountItemId.toString()
  if (accountItemId === ""){
    return {
      code: -1,
      msg: "参数非法"
    }
  }
  try{
    cloud.database().collection("accountBooks").where({
      _openid: wxContext.OPENID,
      _id: accountItemId,
    }).remove()
  }catch (e){
    console.log("删除出错")
    console.log(e)
    return {
      code: -1,
      msg: "服务器故障"
    }
  }

  return {
    code: 0,
    msg: "success"
  }
}