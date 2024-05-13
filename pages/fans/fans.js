// pages/fans/fans.js
import { fansUrl, followUrl, setFollowStateUrl } from "../../utils/api";
const { fetch } = require("../../utils/util");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        active: "0",
        list: [],
    },
    cancelFllow(e) {
        const id = e.currentTarget.dataset.id;
        fetch
            .post(setFollowStateUrl, {
                target_account_id: id,
                state: 2,
            })
            .then((res) => {
                wx.showToast({
                    title: "取消关注成功",
                    icon: "success",
                });
                this.followList();
            });
    },
    onFllow(e) {
        const id = e.currentTarget.dataset.id;
        fetch
            .post(setFollowStateUrl, {
                target_account_id: id,
                state: 1,
            })
            .then((res) => {
                wx.showToast({
                    title: "关注成功",
                    icon: "success",
                });
                this.fansList();
            });
    },
    onChange(e) {
        if (e.detail.title === "关注") {
            this.setData({
                active: 0,
            });
            this.followList();
        } else {
            this.setData({
                active: 1,
            });
            this.fansList();
        }
    },
    // 粉丝列表
    fansList() {
        fetch
            .get(fansUrl)
            .then((res) => {
                this.setData({
                    list: res.data.data.list,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },
    // 关注列表
    followList() {
        fetch
            .get(followUrl)
            .then((res) => {
                this.setData({
                    list: res.data.data.list,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },
    toBack() {
        wx.navigateBack({
            delta: 1, // 返回上一页，默认为1，可以根据需要调整
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (options.type === "粉丝") {
            this.setData({
                active: 1,
            });
            this.fansList();
        } else {
            this.followList();
        }
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
