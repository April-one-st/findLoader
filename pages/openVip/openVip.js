// pages/openVip/openVip.js
import {openVipUrl} from '../../utils/api'
const { fetch } = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    active: 3,
    timeList: [3,6,9,12]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      phone: options.id
    })
  },
  onChange(e) {
    const data = e.currentTarget.dataset.item;
    this.setData({
      active: data
    })
  },
  // 开通vip
  submit() {
    const params = {};
     fetch.post(openVipUrl, params).then().catch()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})