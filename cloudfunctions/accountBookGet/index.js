// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let response = {}

/**
 * 处理储蓄卡
 * @param data
 */
const dealDebitCard = function(data){
  let accountItem = {
    childAccountList: [],
    name: "储蓄卡",
    total: 0
  };
  for (let i in data){
    if (data[i].type !== "debit-card"){
      continue;
    }
    accountItem.childAccountList.push(data[i])
    accountItem.total = safeAdd(accountItem.total, parseFloat(data[i].total))
  }
  response.accountList.push(accountItem)
  response.totalAssets = safeAdd(response.totalAssets, accountItem.total)
}

/**
 * 处理信用卡
 * @param data
 */
const dealCreditCard = function(data){
  let accountItem = {
    childAccountList: [],
    name: "信用卡",
    total: 0
  };

  for (let i in data){
    if (data[i].type !== "credit-card"){
      continue;
    }
    accountItem.childAccountList.push(data[i])
    accountItem.total = safeAdd(accountItem.total, parseFloat(data[i].total))
  }
  response.accountList.push(accountItem)
  response.debtAssets = safeAdd(response.debtAssets, accountItem.total)
}

/**
 * 处理储值卡
 * @param data
 */
const dealStoredCard = function(data){
  let accountItem = {
    childAccountList: [],
    name: "储值卡",
    total: 0
  };

  for (let i in data){
    if (data[i].type !== "stored-card"){
      continue;
    }
    accountItem.childAccountList.push(data[i])
    accountItem.total = safeAdd(accountItem.total, parseFloat(data[i].total))
  }
  response.accountList.push(accountItem)
  response.totalAssets = safeAdd(response.totalAssets, accountItem.total)
}

/**
 * 处理现金
 * @param data
 */
const dealCash = function(data){
  let accountItem = {
    childAccountList: [],
    name: "现金",
    total: 0
  };

  for (let i in data){
    if (data[i].type !== "cash"){
      continue;
    }
    accountItem.childAccountList.push(data[i])
    accountItem.total = safeAdd(accountItem.total, parseFloat(data[i].total))
  }
  response.accountList.push(accountItem)
  response.totalAssets = safeAdd(response.totalAssets, accountItem.total)
}

/**
 * 处理线上账户
 * @param data
 */
const dealOnlinePaid = function(data){
  let accountItem = {
    childAccountList: [],
    name: "线上账户",
    total: 0
  };

  for (let i in data){
    if (data[i].type !== "online-paid"){
      continue;
    }
    accountItem.childAccountList.push(data[i])
    accountItem.total = safeAdd(accountItem.total, parseFloat(data[i].total))
  }
  response.accountList.push(accountItem)
  response.totalAssets = safeAdd(response.totalAssets, accountItem.total)
}

/**
 * 处理借出
 * @param data
 */
const dealReceivable = function(data){
  let accountItem = {
    childAccountList: [],
    name: "借出",
    total: 0
  };

  for (let i in data){
    if (data[i].type !== "receivable"){
      continue;
    }
    accountItem.childAccountList.push(data[i])
    accountItem.total = safeAdd(accountItem.total, parseFloat(data[i].total))
  }
  response.accountList.push(accountItem)
  response.debtOut = safeAdd(response.debtOut, accountItem.total)
}

/**
 * 处理借入
 * @param data
 */
const dealPayable = function(data){
  let accountItem = {
    childAccountList: [],
    name: "借入",
    total: 0
  };

  for (let i in data){
    if (data[i].type !== "payable"){
      continue;
    }
    accountItem.childAccountList.push(data[i])
    accountItem.total = safeAdd(accountItem.total, parseFloat(data[i].total))
  }
  response.accountList.push(accountItem)
  response.debtIn = safeAdd(response.debtIn, accountItem.total)
  response.debtAssets = safeAdd(response.debtAssets, accountItem.total)
}

const safeAdd = function(a, b){
  return (a * 100 + b * 100) / 100;
}

const safeSub = function(a, b){
  return (a * 100 - b * 100) / 100;
}



// TODO 获取账本
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  response = {
    totalAssets: 0.00,
    netAssets: 0.00,
    debtAssets:0.00,
    accountList : [],
    debtOut: 0.00,
    debtIn: 0.00,
  }

  return cloud.database().collection("accountBooks").where({
    _openid: wxContext.OPENID
  }).orderBy("type",'desc').get().then(res => {
    console.log("获取数据成功,openid=" + wxContext.OPENID);
    console.log(res);
    dealDebitCard(res.data)
    dealOnlinePaid(res.data)
    dealCash(res.data)
    dealStoredCard(res.data)
    dealCreditCard(res.data)
    dealReceivable(res.data)
    dealPayable(res.data)
    response.netAssets = safeSub(response.totalAssets, response.debtAssets)
    return {
      code: 0,
      msg: "success",
      data: response
    }
  }).catch(err => {
    console.log("获取账户失败");
    console.log(err)
    return {
      code: -1,
      msg: "获取账户失败",
      data: response,
    }
  })

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