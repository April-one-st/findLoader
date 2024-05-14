// pages/userData/userData.js
import {
    getHomeListUrl,
    getUserInfoUrl,
    buyListUrl,
    auditInfoUrl,
} from "../../../utils/api";
const { fetch } = require("../../../utils/util");
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 这里是组件属性的定义
        text: {
            type: String,
            value: "default text",
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 这里是组件内部数据的定义
        count: 0,
        userInfo: {
            nick_name: "",
            avatar: "",
            vip_time_str: "",
            is_vip: false,
            merchant: false,
            phone: "",
            desc: "",
            fans_count: "",
            follow_count: "",
            release_count: "",
            buy_message_count: "",
            is_follow: false,
            auditSatate: "",
            auditName: "",
        },
        homeList: [],
        buyCardList: [],
        active: 0,
    },
    /**
     * 组件生命周期函数-在组件实例刚刚被创建时执行
     */
    created() {
        console.log("Component created");
    },
    lifetimes: {
        /**
         * 组件生命周期函数-在组件实例进入页面节点树时执行
         */
        attached() {
            this.getUserInfo();
            this.getAuditInfo();
            wx.getLocation({
              type: 'wgs84', // 返回 GPS 坐标，可以使用 gcj02 返回可用于 wx.openLocation 的坐标
              success(res) {
                const latitude = res.latitude; // 纬度
                const longitude = res.longitude; // 经度
                console.log('当前位置:', latitude, longitude);
              },
              fail(err) {
                console.error('获取位置信息失败:', err);
              }
            });
        },
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
        onShareAppMessage() {
            return {
                title: "分享标题",
                path: "/pages/index", // 分享路径，通常是当前页面路径
                imageUrl: "/images/share.png", // 分享图片，可以是本地路径或者远程路径
                success: function (res) {
                    // 分享成功
                },
                fail: function (res) {
                    // 分享失败
                },
            };
        },
        onShare() {
            wx.showShareMenu({
                withShareTicket: true, // 是否使用带 shareTicket 的转发
            });
        },
        toPersonal() {
            wx.navigateTo({
                url: "/pages/personal/personal",
            });
        },
        // 获取用户信息
        getUserInfo() {
          const that = this
            const params = { account_id: "" };
            fetch
                .get(getUserInfoUrl, params)
                .then((res) => {
                    if (res.statusCode === 200) {
                        console.log(111222, res);
                        that.setData({
                            userInfo: res.data.data,
                        });
                        that.getHomeList(res.data.data)
                        that.getBuyList(res.data.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 获取首页列表
        getHomeList(data) {
            const params = {
                account_id: data.id || "",
            };
            fetch
                .get(getHomeListUrl, params)
                .then((res) => {
                  console.log('11111=====>', res)
                    this.setData({
                        homeList: res.data?.data?.list,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 获取求购列表
        getBuyList(data) {
            const params = {
                account_id: data.id,
            };
            fetch
                .get(buyListUrl, params)
                .then((res) => {
                  console.log('22222=====>', res)
                    this.setData({
                        buyCardList: res?.data?.data?.list,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAuditInfo() {
            fetch
                .get(auditInfoUrl, { audit_type: 2 })
                .then((res) => {
                    console.log(res);
                    const data = res.data.data;
                    this.setData({
                        auditSatate: data.state,
                        auditName: data.name,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 跳转商户认证
        toAuthentication() {
            if (!this.data.auditSatate) {
                wx.navigateTo({
                    url: "/pages/authentication/authentication",
                });
            } else {
                wx.navigateTo({
                    url: `/pages/audit/audit?name=${this.data.auditName}&state=${this.data.auditSatate}`,
                });
            }
        },
        // 跳转实名认证
        toRealName() {
            wx.navigateTo({
                url: "/pages/realName/realName",
            });
        },
        // 跳转开通vip
        openVip() {
            wx.navigateTo({
                url: `/pages/openVip/openVip?id=${this.data.userInfo.phone}`,
            });
        },
        // 粉丝页
        toFans() {
            wx.navigateTo({
                url: "/pages/fans/fans?type=粉丝",
            });
        },
        // 关注页
        toAttention() {
            wx.navigateTo({
                url: "/pages/fans/fans?type=关注",
            });
        },
        onChange(e) {
            this.setData({
                active: e.detail.index,
            });
            console.log(e);
        },
    },
});
