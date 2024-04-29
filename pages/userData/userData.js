// pages/userData/userData.js
import { getHomeListUrl, getUserInfoUrl, buyListUrl } from "../../utils/api";
const { fetch } = require("../../utils/util");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            nick_name: "测试",
            avatar: "../../../images/logo.png",
            vip_time_str: "2024-05-01",
            is_vip: true,
            merchant: false,
            phone: 110,
            desc: "测试数据",
            fans_count: "999",
            follow_count: "999",
            release_count: "999",
            buy_message_count: "999",
            is_follow: false,
        },
        homeList: [],
        buyCardList: [],
        btnList: [
            { label: "关注", className: "add", icon: "/images/add.png" },
            {
                label: "消息",
                className: "leave",
                icon: "/images/leave-false.png",
            },
            {
                label: "呼叫",
                className: "telephone",
                icon: "/images/telephone-false.png",
            },
        ],
    },
    // 获取用户信息
    getUserInfo(id) {
        const params = { account_id: id };
        fetch
            .get(getUserInfoUrl, params)
            .then((res) => {
                if (res.statusCode === 200) {
                    this.setData({
                        userInfo: res.data.data
                    })
                    this.getHomeList(res.data.data);
                    this.getBuyList(res.data.data);
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
                if (res.statusCode === 200) {
                    this.setData({
                        homeList: res.data.data.list,
                    });
                }
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
                if (res.statusCode === 200) {
                    console.log("======>1", res);
                    this.setData({
                        buyCardList: res.data.data.list,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    toBack() {
        wx.navigateBack({
            delta: 1, // 返回的页面数，1表示返回上一页，2表示返回上两页，以此类推
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const id = options.id;
        this.getUserInfo(id);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
});
