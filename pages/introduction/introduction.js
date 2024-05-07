// index.js
import { UpUserInfoUrl } from "../../utils/api";
const { fetch } = require("../../utils/util");
import Toast from "@vant/weapp/toast/toast";

Page({
    data: {
        value: "",
    },
    submit() {
        const params = {
            desc: this.data.value,
        };
        fetch
            .post(UpUserInfoUrl, params)
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
