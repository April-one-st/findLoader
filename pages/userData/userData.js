// pages/userData/userData.js
import Toast from '@vant/weapp/toast/toast';
import {
    getHomeListUrl,
    getUserInfoUrl,
    buyListUrl,
    setFollowStateUrl,
} from "../../utils/api";
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
                    const _data = this.data.btnList.map(item => {
                        if(item.className === 'add' && res.data.data.is_follow){
                            return {label: "取消关注", className: "add", icon: "" }
                        }else{
                            return item
                        }
                    })
                    this.setData({
                        userInfo: res.data.data,
                        btnList: _data
                    });
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
    // 返回上一页
    toBack() {
        wx.navigateBack({
            delta: 1, // 返回的页面数，1表示返回上一页，2表示返回上两页，以此类推
        });
    },
    // 按钮事件
    btnClick(e) {
        const data = e.target.dataset;
        const name = data.id;
        const phone = data.phpne;
        if (name === "消息") {
            wx.navigateTo({
              url: `/pages/leave/leave?id=${this.data.userInfo.id}`
            });
        }
        if (name === "关注" || name==="取消关注") {
            fetch.post(setFollowStateUrl, {
                target_account_id: this.data.userInfo.id,
                state: this.data.userInfo.is_follow ? 2 : 1,
            }).then(res => {
                console.log(res);
                if(res.statusCode === 200) {
                    Toast({
                      context: this,
                      type: 'success',
                      message: "操作成功"
                    });
                    if(res.data.data === '已取消关注') {
                        const _data = this.data.btnList.map(item => {
                            if(item.className === 'add'){
                                return {label: "关注", className: "add", icon: "/images/add.png" }
                            }else{
                                return item
                            }
                        })
                        console.log(111, _data);
                        this.setData({
                            btnList: _data
                        });
                    }else{
                        const _data = this.data.btnList.map(item => {
                            if(item.className === 'add'){
                                return {label: "取消关注", className: "add", icon: "" }
                            }else{
                                return item
                            }
                        })
                        this.setData({
                            btnList: _data
                        });
                    }
                  }
            }).catch(err => {
                console.log(err);
            });
        }
        if (name === "呼叫") {
            wx.makePhoneCall({
                phoneNumber: phone,
            });
        }
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
