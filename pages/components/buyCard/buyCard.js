// pages/components/buyCard/buyCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    districtOptions: [
        { text: '全国', value: 'all' },
        { text: '全国1', value: 'all1' },
        { text: '全国2', value: 'all12' },
    ],
    brandOptions:[
        { text: '品牌', value: 'all' },
    ],
    modelOptions:[
        { text: '型号', value: 'all' },
    ],
    yearOptions:[
        { text: '年限', value: 'all' },
    ],  
    districtValue: 'all',
    brandValue: 'all',
    modelValue: 'all',
    yearValue: 'all'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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