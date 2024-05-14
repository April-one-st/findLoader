// pages/search/search.js
import { getHomeListUrl } from "../../utils/api.js";
const { fetch } = require("../../utils/util");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        value: "",
        cardList: [],
        total: 10,
        currentPage: 1,
        pageSize: 10,
    },
    searchChange(e) {
        this.setData({
            value: e.detail,
        });
    },
    onClick() {
        this.getDataList()
    },
    getDataList() {
      const params = {
        desc: this.data.value,
        per_page: this.data.pageSize,
        page: this.data.currentPage,
    };
    fetch
        .get(getHomeListUrl, params)
        .then((res) => {
            const list = res.data.data.list;
            console.log(res)
            this.setData({
                cardList: [...this.data.cardList, ...list],
                total: res.data.data.total,
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
    onPullDownRefresh() {
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
      console.log(12123123)
      if(this.data.total < this.data.cardList.length) {
        this.setData({
          currentPage: this.data.currentPage + 1
        })
        this.getDataList()
      }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
});
