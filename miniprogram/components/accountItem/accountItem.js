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
            //拼接url
            let url = "../../pages/addAccount/addAccountDetail/addAccountDetail";
            let first = true //用来判断url参数的拼接
            let dataset = event.currentTarget.dataset
            for (let i in dataset){
                url += (first ? "?" : "&") + i + "=" + dataset[i]
                first = false
            }
            console.log("开始跳转，url=" + url);
            wx.navigateTo({
                url: url
            })
        }
    }
})
