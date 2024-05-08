// pages/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentPage: '买车'
  },
  getCurrentPage(e) {
    this.setData({
        currentPage: e.detail
    })
    const footerObj = this.selectComponent('.footer-current');
    footerObj.setPage(e.detail)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      const page = options.page
      this.setData({
        currentPage: page
      })
      const footerObj = this.selectComponent('.footer-current');
        footerObj.setPage(page)
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
    console.log(45465456456)
    this.childComponent = this.selectComponent('#main');
    this.childComponent.getUserInfo();
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