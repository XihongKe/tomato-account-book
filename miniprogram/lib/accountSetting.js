const typeCN = {
    "credit-card": "信用卡",
    "debit-card": "储蓄卡",
    "stored-card": "储值卡",
    "online-paid": "在线支付",
    "cash": "现金",
    "receivable": "应收款",
    "payable": "应付账",
}

const AccountSetting = {
    getSetting: (type) => {
        let data = {};
        let err = undefined;
        switch (type) {
            case "credit-card":
                data = [
                    {
                        name: "账户名称",
                        key: "name",
                        type: "String"
                    },
                    {
                        name: "当前账款",
                        key: "total",
                        type: "Number"
                    },
                    {
                        name: "信用卡额度（必填）",
                        key: "quota",
                        type: "Number"
                    },
                ]
                break;
            case "debit-card":
            case "stored-card":
            case "online-paid":
            case "cash":
                data = [
                    {
                        name: "账户名称",
                        key: "name",
                        type: "String"
                    },
                    {
                        name: "余额",
                        key: "total",
                        type: "Number"
                    },
                ]
                break;
            case "receivable":
                data = [
                    {
                        name: "对方名称",
                        key: "name",
                        type: "String"
                    },
                    {
                        name: "应收金额",
                        key: "total",
                        type: "Number"
                    },
                ]
                break;
            case "payable":
                data = [
                    {
                        name: "对方名称",
                        key: "name",
                        type: "String"
                    },
                    {
                        name: "应付金额",
                        key: "total",
                        type: "Number"
                    },
                ]
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
    },
    getTypeCN: (type) => {
        return typeCN[type]
    }
}

export {AccountSetting}