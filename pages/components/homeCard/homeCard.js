// pages/components/homeCard/homeCard.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 这里是组件属性的定义
        info: {
            type: Object,
            value: null,
        },
        toCurrentPage: {
            type: Function,
            value: function () {},
        },
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件生命周期函数-在组件实例刚刚被创建时执行
     */
    created() {
        console.log("Component created");
    },

    /**
     * 组件生命周期函数-在组件实例进入页面节点树时执行
     */
    attached() {
        console.log("Component attached");
    },

    /**
     * 组件生命周期函数-在组件布局完成后执行，此时可以获取节点信息
     */
    ready() {
        console.log("Component ready");
    },

    /**
     * 组件生命周期函数-在组件实例被移动到节点树另一个位置时执行
     */
    moved() {
        console.log("Component moved");
    },

    /**
     * 组件生命周期函数-在组件实例被从页面节点树移除时执行
     */
    detached() {
        console.log("Component detached");
    },

    /**
     * 组件的方法列表
     */
    methods: {
        toUserInfo() {
            console.log(this.properties.info.account.id);
            wx.navigateTo({
                url:
                    "/pages/userData/userData?id=" +
                    this.properties.info.account.id,
            });
        },
        toCallPhone(e) {
            const phoneNumber = e.currentTarget.dataset.phonenum;
            console.log("phone:::", phoneNumber);
            wx.makePhoneCall({
                phoneNumber: phoneNumber,
            });
        },
        toInformation() {
            console.log(11111);
            this.triggerEvent('customEvent', '消息');
        },
    },
});
