// components/accountItem.js
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
        accountEdit: function (id) {

        }
    }
})
