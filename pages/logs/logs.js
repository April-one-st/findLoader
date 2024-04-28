// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: '',
    imageUrl: '/images/radio-false.png',
    userInfo: {
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    isRead: false
  },
  bindViewTap() {
    wx.redirectTo({
      url: '../logs/logs'
    })
  },
  changeImage() {
    // 点击后更换图片地址
    if(this.data.imageUrl === '/images/radio-false.png') {
      this.setData({
        imageUrl: '/images/radio-true.png', // 更换后的图片地址
        isRead: true
      });
    }else{
      this.setData({
        imageUrl: '/images/radio-false.png', // 更换后的图片地址
        isRead: false
      });
    }
  },
  // 登录
  logo() {
    wx.redirectTo({
      url: '/pages/home/home'
    });
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  
  toAgreeAgreement() {
    if(!this.data.isRead) {
      wx.showToast({
        title: '请阅读并勾选用户协议',
        icon: 'none'
      });
      return
    };
  },
  //绑定手机
  getPhoneNumber: function (e) {
    console.log(e);
    this.logo();
    //  需要做配置；涉及购买次数等。详情见--->  手机号快速验证组件 （微信官方文档）
    // if(!e.detail.code) return;
    // fetch.get('/wechat/minapp/getPhoneNumber', {
    //   jsCode: e.detail.code ? e.detail.code : ''
    // }).then(resolve => {
    //   if(resolve.success) {
    //     wx.login({
    //       success: (res) => {
    //         if(res.code) {
    //           fetch.post('/wechat/minapp/login/phone', {
    //             phoneNumber: resolve.result ? resolve.result : '',
    //             jsCode: res.code
    //           }).then(data => {
    //             wx.removeStorageSync('token');
    //             wx.showLoading({
    //               title: '登录中，请稍后',
    //             });
    //             wx.setStorageSync('token', data.result);
    //             this.getLoginUserInfo();
    //           });
    //         };
    //       },
    //     });
    //   } else {
    //     wx.showModal({
    //       title: "错误",
    //       content: resolve.message,
    //       showCancel: false,
    //       confirmText: "确定"
    //     });
    //   };
    // });
  },
})
