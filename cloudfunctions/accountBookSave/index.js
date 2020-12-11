// 云函数入口文件
const cloud = require('wx-server-sdk')
const Joi = require('joi')

cloud.init()

// 保存用户账户
exports.main = async (event, context) => {
    // 校验数据是否合法
    const {error, value} = Joi.object().keys({
        name: Joi.string().min(1, "utf8"),
        total: Joi.number().positive().precision(2),
        quota: Joi.number().positive().precision(2),
        type: Joi.string(),
    }).validate({
        name: event.name,
        total: event.total,
        type: event.type,
        quota: event.quota,
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

    //根据账本类型获取要保存的前端数据
    let data = getDataByType(event, wxContext)
    if (data.err !== undefined) {
        return data.err
    }
    data = data.data

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

    //新增
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

/**
 * 根据类型获取要保存到数据库的数据
 * @param event
 * @returns {{data: {}, err: {msg: string, code: number}}}
 */
function getDataByType(event, wxContext) {
    let data = {};
    let err = undefined;
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
            err = {
                code: -1,
                msg: "账本类型非法"
            }
    }
    return {
        data: data,
        err: err
    }
}
