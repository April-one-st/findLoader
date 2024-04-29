// pages/search/search.js
import { getHomeListUrl } from "../../utils/api.js";
const { fetch } = require("../../utils/util");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        value: "",
        cardList: []
    },
    searchChange(e) {
        this.setData({
            value: e.detail,
        });
    },
    onClick() {
        // const params = {
        //    value: this.detail.value
        // };
        const params = {}
        fetch
            .get(getHomeListUrl, params)
            .then((res) => {
                this.setData({
                    cardList: res.data.data.list,
                });
            })
            .catch();
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},

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
    onUnload() {
        wx.redirectTo({
            url: "/pages/home/home",
        });
    },

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
