// index.js
import { buyMessageUrl } from "../../utils/api";
const { fetch } = require("../../utils/util");
import Toast from '@vant/weapp/toast/toast';

Page({
    data: {
      value: ''
    },
    submit() {
        const params = {
          text: this.data.value
        };
        fetch.post(buyMessageUrl, params).then(res => {
          if(res.statusCode === 200) {
            Toast({
              context: this,
              type: 'success',
              message: '发布成功'
            });
            setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/home/home'
                })
            }, 1000)
          }
        }).catch(err => {
          console.log(err);
        });
    },
    onInput(e){
      const value = e.detail.value;
      this.setData({
        value: value
      })
    }
});
