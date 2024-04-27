// pages/components/buyCard/buyCard.js
import {getHomeListUlr, fileUpLoadUrl,publishUrl} from '../../../utils/api'
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
    yearValue: 'all',
    cardList: []
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
    this.getDataList();
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
    // 这里是自定义方法的定义
    getDataList() {
      const params = {}
      fetch.get(getHomeListUlr, params).then(res =>{
        this.setData({
          cardList: res.data.data.list
        })
      }).catch()
    }
  }
});