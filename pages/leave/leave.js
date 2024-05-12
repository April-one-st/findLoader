// index.js
import { leaveUrl } from "../../utils/api";
const { fetch } = require("../../utils/util");
import Toast from "@vant/weapp/toast/toast";

Page({
    data: {
        value: "",
        id: '',
    },
    onLoad(options) {
      // 在页面加载时获取参数
      const id = options.id; // 获取 id 参数
      this.setData({
        id: id
      })
    },
    submit() {
        const params = {
          account_id: Number(this.data.id),
          text: this.data.value,
        };
        fetch
            .post(leaveUrl, params)
            .then((res) => {
                if (res.statusCode === 200) {
                    Toast({
                        context: this,
                        type: "success",
                        message: "保存成功",
                    });
                    setTimeout(() => {
                        wx.navigateBack({
                            delta: 1,
                        });
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    onInput(e) {
        const value = e.detail.value;
        this.setData({
            value: value,
        });
    },
});
