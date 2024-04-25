// pages/userData/userData.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      btnList: [
          {label: '关注', className: "add", icon: "/images/add.png"},
          {label: '消息', className: "leave", icon: "/images/leave-false.png"},
          {label: '呼叫', className: "telephone", icon: "/images/telephone-false.png"},
      ]
  },
  toBack() {
    wx.navigateBack({
        delta: 1 // 返回的页面数，1表示返回上一页，2表示返回上两页，以此类推
    })
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