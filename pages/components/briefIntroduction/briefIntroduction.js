// pages/components/homeCard/homeCard.js
import { UpUserInfoUrl } from "../../../utils/api";
const { fetch } = require("../../../utils/util");
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 这里是组件属性的定义
        info: {
            type: Object,
            value: null,
            observer(newVal, oldVal) {
              console.log(11112222, newVal, oldVal);
              // 参数变化时触发更新
              // this.setData({
              //   propA: newVal
              // });
            }
        },
        isDisable: {
          type: Boolean,
          value: false,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
      markers: [{
        id: 1,
        latitude: 39.90469,
        longitude: 116.40717,
        title: '这里是标题',
        callout: {
          content: '这是一个标记',
          color: '#ffffff',
          fontSize: 14,
          borderRadius: 5,
          bgColor: '#ff0000',
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      }],
    },

    /**
     * 组件生命周期函数-在组件实例刚刚被创建时执行
     */
    created() {
        console.log("Component created");
    },

    /**
     * 组件生命周期函数-在组件实例进入页面节点树时执行
     */
    attached() {
        console.log("Component attached", this.data.info);
    },

    /**
     * 组件生命周期函数-在组件布局完成后执行，此时可以获取节点信息
     */
    ready() {
        console.log("Component ready1111", this.info);
    },

    /**
     * 组件生命周期函数-在组件实例被移动到节点树另一个位置时执行
     */
    moved() {
        console.log("Component moved");
    },

    /**
     * 组件生命周期函数-在组件实例被从页面节点树移除时执行
     */
    detached() {
        console.log("Component detached");
    },

    /**
     * 组件的方法列表
     */
    methods: {
        toIntroduction() {
            wx.navigateTo({
                url: "/pages/introduction/introduction",
            });
        },
        onMapTap: function(event) {
          console.log('地图被点击了:', event);
          const latitude = event.detail.latitude + '';
          const longitude = event.detail.longitude + '';
          console.log('点击位置的经度:', longitude);
          console.log('点击位置的纬度:', latitude);
          const params = {
            x: latitude,
            y: longitude
          }
          fetch.post(UpUserInfoUrl, params).then(res => {
          }).catch(err => {
            console.log(err);
          })
        },
        toPhotoedit() {
          wx.navigateTo({
            url: "/pages/photoedit/photoedit",
        });
        }
        //   toUserInfo() {
        //     wx.navigateTo({
        //         url: '/pages/userData/userData'
        //       })
        //   },
        //   toCallPhone(e) {
        //     const phoneNumber = e.currentTarget.dataset.phonenum;
        //     console.log('phone:::', phoneNumber)
        //     wx.makePhoneCall({
        //       phoneNumber: phoneNumber
        //     });
        //   },
    },
});
