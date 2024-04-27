// pages/components/footer/footer.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    getCurrentPage: {
        type: Function,
        value: function() {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      {
        name: '买车',
        url:'/images/home-false.png',
        urlTrue: '/images/home-true.png',
        isTrue: true,
      },
      {
        name: '发布',
        url:'/images/add-false.png',
        urlTrue: '/images/add-true.png',
        isTrue: false,
      },
      {
        name: '消息',
        url:'/images/information-false.png',
        urlTrue: '/images/information-true.png',
        isTrue: false,
      },
      {
        name: '我的',
        url:'/images/main-false.png',
        urlTrue: '/images/main-true.png',
        isTrue: false,
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change(e) {
        const data = e.currentTarget.dataset.item;
        const _data = this.data.list.map(item => {
            if(item.name === data.name){
            item.isTrue = true
            }else {
            item.isTrue = false
            }
            return item
        })
        this.setData({
            list: _data
        })
        this.triggerEvent('customEvent', data.name);
    },
    setPage (value) {
      console.log(1111111, value);
      const _data = this.data.list.map(item => {
        if(item.name === value){
        item.isTrue = true
        }else {
        item.isTrue = false
        }
        return item
    })
    this.setData({
        list: _data
    })
    }
  }
})