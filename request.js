/**
       request.js
     * 封装一个Promise风格的通用请求
     * url - 请求地址
     * option - 包含请求方式、请求参数的配置对象
 */
var app = getApp(); //引入全局app.js，我们可以在globalData中定义一些公用的数据，比如baseUrl、token
import Toast from "/@vant/weapp/toast/toast"; //引入vant插件，用于提示错误
const request = function (url, options) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: app.globalData.baseUrl + url,
            method: options.method,
            data:
                options.method == "GET"
                    ? options.data
                    : JSON.stringify(options.data), // header这里根据业务情况自行选择需要还是不需要
            header: {
                Authorization: "Bearer " + app.globalData.token,
            },
            success: (res) => {
                if (res.data.code == 7) {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'error',
                    })
                    reject(res.data.msg);
                } else {
                    resolve(res);
                }
            },
            fail: (err) => {
                reject(err);
            },
        });
    });
};
module.exports = {
    //封装get方法
    get(url, data) {
        return request(url, {
            method: "GET",
            data,
        });
    }, //封装post方法
    post(url, data) {
        return request(url, {
            method: "POST",
            data,
        });
    },
    upLoad(url, data) {
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: app.globalData.baseUrl + url, // 上传接口地址
                filePath: data.filePath, // 要上传的文件路径
                name: "file", // 服务器端接收文件的字段名
                formData: data.formData,
                header: {
                    "Content-Type": "multipart/form-data", // 设置请求头
                },
                success: function (res) {
                    // 上传成功后的处理逻辑
                    if (res.data.code == 500) {
                      Toast(res.data.msg);
                      reject(res.data.msg);
                  } else {
                      resolve(res);
                  }
                },
                fail: function (error) {
                    // 上传失败后的处理逻辑
                    console.error("上传失败", error);
                },
            });
        });
    },
};
