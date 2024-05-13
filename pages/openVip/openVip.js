// pages/openVip/openVip.js
import { openVipUrl, priceUrl } from "../../utils/api";
const { fetch } = require("../../utils/util");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        phone: "",
        active: 3,
        timeList: [3, 6, 9, 12],
        price: '',
        discount: '',
        danjia: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            phone: options.id,
        });
        this.getPrice();
    },
    onChange(e) {
        const data = e.currentTarget.dataset.item;
        this.setData({
            active: data,
            price: this.data.danjia / 10 * data
        });
    },
    getPrice() {
      fetch.get(priceUrl).then(res => {
        this.setData({
          price: res.data.data.unit_price / 10 * this.data.active,
          discount: res.data.data.vip_discount,
          danjia: res.data.data.unit_price
        })
      })
    },
    // 生成随机字符串
    generateNonceStr(length) {
        let chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let str = "";
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return str;
    },
    // 获取当前时间戳（秒）
    getCurrentTimestamp() {
        return Math.floor(Date.now() / 1000).toString();
    },
    // 生成支付签名
    generatePaySign(data, key) {
        let stringA = Object.keys(data)
            .filter((key) => data[key] !== undefined && data[key] !== "")
            .sort()
            .map((key) => key + "=" + data[key])
            .join("&");
        stringA += "&key=" + key;

        return crypto
            .createHash("md5")
            .update(stringA, "utf8")
            .digest("hex")
            .toUpperCase();
    },
    // 示例：生成微信支付所需参数
    generatePaymentParams(prepayId) {
        let timeStamp = this.getCurrentTimestamp();
        let nonceStr = this.generateNonceStr(32);
        let appId = "your_app_id"; // 替换为你的小程序的 AppID
        let key = "your_key"; // 替换为你的商户密钥

        let signData = {
            appId: appId,
            timeStamp: timeStamp,
            nonceStr: nonceStr,
            package: "prepay_id=" + prepayId,
            signType: "MD5",
        };

        let paySign = this.generatePaySign(signData, key);

        return {
            timeStamp: timeStamp,
            nonceStr: nonceStr,
            package: "prepay_id=" + prepayId,
            signType: "MD5",
            paySign: paySign,
        };
    },
    // 开通vip
    submit() {
        let that = this;
        const params = {
            month: this.data.active,
        };
        fetch
            .post(openVipUrl, params)
            .then((res) => {
                console.log("res", res);
                const data = res.data.data.prepay
                const params = {
                  timeStamp: data.timeStamp,  //后端返回的时间戳
                  nonceStr:  data.nonceStr,   //后端返回的随机字符串
                  package:  data.package, //后端返回的prepay_id
                  signType: data.signType, //后端签名算法,根据后端来,后端MD5这里即为MD5
                  paySign:  data.paySign,  //后端返回的签名
                }
                wx.requestPayment({
                    ...params,
                    success(res) {
                        console.log("用户支付扣款成功", res);
                        wx.navigateBack({
                          delta: 1 // 返回的页面数，1表示返回上一页，2表示返回上两页，依此类推
                        })
                    },
                    fail(res) {
                        console.log("用户支付扣款失败", res);
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
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
