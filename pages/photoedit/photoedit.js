// index.js
import { UpUserInfoUrl, fileUpLoadUrl } from "../../utils/api";
const { fetch } = require("../../utils/util");
import Toast from "@vant/weapp/toast/toast";

Page({
    data: {
        fileList: [],
    },
    // 文件上传
    afterRead(e) {
        console.log(e);
        const file = e.detail.file;
        const params = {
            filePath: file[0].url,
            formData: {
                file: file,
            },
        };
        const fileList = this.data.fileList;
        fetch
            .upload(fileUpLoadUrl, params)
            .then((res) => {
                const baseUrl = "http://118.24.150.23:9000/car/";
                const { data } = JSON.parse(res.data);
                console.log(data);
                const obj = {
                    url: baseUrl + data[0].file_path,
                    name: data[0].file_name,
                    isImage: true,
                    deletable: true,
                    id: data[0].id,
                };
                fileList.push(obj);
                this.setData({
                    fileList,
                });
                console.log(1111, JSON.parse(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    },
    // 删除图片
    delFileList(key) {
        console.log(key);
        const detail = key.detail;
        const data = this.data.fileList;
        const list = data.filter((item, index) => index !== detail.index);
        this.setData({
            fileList: list,
        });
    },
    submit() {
        const params = {
          image_desc: this.data.fileList.map(item => item.id),
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
});
