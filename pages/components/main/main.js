// pages/userData/userData.js
import {getHomeListUrl, getUserInfoUrl, buyListUrl} from '../../../utils/api'
const { fetch } = require("../../../utils/util");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 这里是组件属性的定义
    text: {
      type: String,
      value: 'default text'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 这里是组件内部数据的定义
    count: 0,
    userInfo: {
        nick_name: '测试',
        avatar: '../../../images/logo.png',
        vip_time_str: '2024-05-01',
        is_vip: true,
        merchant: false,
        phone: 110,
        desc: '测试数据',
        fans_count: '999',
        follow_count: '999',
        release_count: '999',
        buy_message_count: '999',
        is_follow: false
    },
    homeList: [],
    buyCardList: []
  },
  /**
   * 组件生命周期函数-在组件实例刚刚被创建时执行
   */
  created() {
    console.log('Component created');
  },

  /**
   * 组件生命周期函数-在组件实例进入页面节点树时执行
   */
  attached() {
    console.log('Component attached');
    this.getUserInfo()
  },

  /**
   * 组件生命周期函数-在组件布局完成后执行，此时可以获取节点信息
   */
  ready() {
    console.log('Component ready');
  },

  /**
   * 组件生命周期函数-在组件实例被移动到节点树另一个位置时执行
   */
  moved() {
    console.log('Component moved');
  },

  /**
   * 组件生命周期函数-在组件实例被从页面节点树移除时执行
   */
  detached() {
    console.log('Component detached');
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toPersonal() {
      wx.navigateTo({
        url: '/pages/personal/personal',
      })
    },
    // 获取用户信息
    getUserInfo(){
        const params = {account_id: ''}
        fetch.get(getUserInfoUrl, params).then(res => {
            if(res.statusCode === 200){
                this.setData({
                    userInfo: res.data.data
                })
                this.getHomeList(res.data.data)
                this.getBuyList(res.data.data)
            }
        }).catch(err => {
            console.log(err);
        })
    },
    // 获取首页列表
    getHomeList(data){
      const params = {
        account_id: data.id || ''
      };
      fetch.get(getHomeListUrl, params).then(res => {
        if(res.statusCode === 200){
            this.setData({
                homeList: res.data.data.list
            })
        }
      }).catch(err=>{
          console.log(err);
      })
    },
    // 获取求购列表
    getBuyList(data) {
      const params = {
        account_id: data.id
      };
      fetch.get(buyListUrl, params).then(res => {
        if(res.statusCode === 200){
            console.log('======>1', res);
            this.setData({
                buyCardList: res.data.data.list
            })
        }
      }).catch(err => {
          console.log(err);
      })
    },
    // 跳转商户认证
    toAuthentication(){
      wx.navigateTo({
        url: '/pages/audit/audit'
      })
      let card = wx.getStorageSync("card");
        if (!card) {
          wx.navigateTo({
            url: '/pages/authentication/authentication'
          })
        }else{

        }
      
    },
    // 跳转实名认证
    toRealName() {
        wx.navigateTo({
            url: '/pages/realName/realName'
          })
    },
    // 跳转开通vip
    openVip(){
      wx.navigateTo({
        url: '/pages/openVip/openVip'
      })
    },
    // 粉丝页
    toFans() {
      wx.navigateTo({
        url: '/pages/fans/fans?type=粉丝'
      });
    },
    // 关注页
    toAttention() {
      wx.navigateTo({
        url: '/pages/fans/fans?type=关注'
      });
    },
  }
});