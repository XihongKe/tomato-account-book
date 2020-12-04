import _ from "../../lib/lodash.min"

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        accountData: {
            type: Object,
            default: {}
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        //是否展示列表
        isShowList: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //切换展示列表
        toggleShowList: function () {
            this.setData({"isShowList": !this.data.isShowList});
        },
        //跳转到资产编辑页
        accountEdit: function (event) {
            console.log("触发事件");
            console.log(event);
            let id = _.get(event, "currentTarget.dataset.id", "")
            let type = _.get(event, "currentTarget.dataset.type", "debit-card")
            let total = _.get(event, "currentTarget.dataset.total", 0.00)
            let name = _.get(event, "currentTarget.dataset.name", "")
            let quota = _.get(event, "currentTarget.dataset.quota", 0.00)
            let path = "";
            switch (type){
                case "debit-card":
                    path = "addAccount/debitCard/debitCard"
                    break;
                case "credit-card":
                    path = "addAccount/creditCard/creditCard"
                    break;
                case "stored-card":
                    path = "addAccount/storedCard/storedCard"
                    break;
                case "online-paid":
                    path = "addAccount/onlinePaid/onlinePaid"
                    break;
                case "cash":
                    path = "addAccount/cash/cash"
                    break;
                case "payable":
                    path = "addDebt/payable/payable";
                    break;
                case "receivable":
                    path = "addDebt/receivable/receivable";
                    break;
            }
            console.log("开始跳转，url=" + "../../pages/" + path + "?id=" + id + "&type=" + type + "&name" + name + "&total=" + total + "&quota=" + quota );
            wx.navigateTo({
                url: "../../pages/" + path + "?id=" + id + "&type=" + type + "&name=" + name + "&total=" + total + "&quota=" + quota
            })
        }
    }
})
