// pages/audit/audit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '审核中',
    name: '商家名称',
    status: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let status = false;
    let name = '审核中'
    console.log(12321312312, options)
    if(options.state == 2) {
      name = '审核通过'
    }
    if(options.state == 3) {
      name = '审核拒绝'
      status = true;
    }
    this.setData({
      name: options.name,
      status: status,
      value: name
    })
  },
  submit() {
    wx.navigateTo({
      url: '/pages/authentication/authentication'
    })
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