// pages/userData/userData.js
import {getHomeListUlr} from '../../../utils/api'
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
    count: 0
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
    // 获取首页列表
    getHomeList(){
      const params = {};
      fetch.get(getHomeListUlr, params).then().catch()
    },
    // 获取求购列表
    getBuyList() {
      const params = {};
      fetch.get(bugListUrl, params).then().catch()
    },
    // 跳转商户认证
    toAuthentication(){
      wx.navigateTo({
        url: '/pages/authentication/authentication'
      })
    },
    // 跳转开通vip
    openVip(){
      wx.navigateTo({
        url: '/pages/openVip/openVip'
      })
    },
  }
});