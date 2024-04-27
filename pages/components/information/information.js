// index.js
import dayjs from 'dayjs';
import {newsListUrl} from '../../../utils/api'
const { fetch, formatTime } = require("../../../utils/util");
// const dayjs = require('dayjs')

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
    list: [],
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
    this.getList()
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
    // 获取消息列表
    getList() {
      fetch.get(newsListUrl).then(res => {
        console.log(res);
        if(res.statusCode === 200) {
          const {data} = res;
          const list = data.data.map(item => {
            return {
              ...item,
              time: dayjs(item.time).format('YYYY-MM-DD')
            }
          })
          console.log(123, list);
          this.setData({
            list:list
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
  }
});
