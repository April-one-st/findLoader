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
  toAgreeAgreement() {
    if(!this.data.isRead) {
      wx.showToast({
        title: '请阅读并勾选用户协议',
        icon: 'none'
      });
      return
    };
  },
  getUserInfo: function(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '申请获取并验证您的个人信息！',
      showCancel: true,
      success: (res) => {
        if (res.confirm) {
          wx.getUserInfo({
            success: (res) => {
              that.handlerLogin(res.userInfo);
            }
          })
        }
      }
    });
  },
  handlerLogin(info){
    let that = this
    wx.login({
      success: res => {
        //获取code
        const code = res.code
        //将code发给后端请求token
        wx.request({
          url: 'https://abc.frezz.top/api/v1/login',
          data:{ code, nice_name: info.nickName },
          method:'post',
          success:(res) =>{
            const token = res.data.data.token
            console.log(11111, token);
            wx.setStorageSync('card', res.data.data.card)
            //将token保存本地
            wx.setStorageSync('token', token)
            wx.redirectTo({
              url: '/pages/home/home'
            });
          }
        })
      }
    })
  },
  //绑定手机
  getPhoneNumber: function (e) {
    // this.getUserInfo();
    // this.handlerLogin();
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
  // 用户协议
  toAgreement() {
    wx.navigateTo({
      url: '/pages/agreement/agreement'
    })
  },
  toPrivacy() {
    wx.navigateTo({
      url: '/pages/privacy/privacy'
    })
  }
})
