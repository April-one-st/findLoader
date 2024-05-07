// pages/personal/personal.js
import { fileUpLoadUrl, UpUserInfoUrl } from "../../utils/api";
const { fetch } = require("../../utils/util");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        fileList: [],
        name: "",
    },
    // 文件上传
    afterRead(e) {
        console.log(e);
        const file = e.detail.file;
        const params = {
            filePath: file.url,
            formData: {
                file: file,
            },
        };
        const _data = [];
        fetch
            .upload(fileUpLoadUrl, params)
            .then((res) => {
                const baseUrl = "http://118.24.150.23:9000/car/";
                const { data } = JSON.parse(res.data);
                const obj = {
                    url: baseUrl + data[0].file_path,
                    name: data[0].file_name,
                    isImage: true,
                    deletable: true,
                    id: data[0].id,
                };
                _data.push(obj);
                this.setData({
                    fileList: _data,
                });
            })
            .catch((err) => {
                throw err;
            });
    },
    // 删除图片
    delFileList(key) {
        this.setData({
            fileList: [],
        });
    },
    nameChange(e) {
      console.log(e.detail)
      this.setData({
        name: e.detail
      })
    },
    // 表单提交
    submit() {
      const params = {
        nick_name: this.data.name,
        avatar: this.data.fileList[0].url
      }
      fetch.post(UpUserInfoUrl, params).then(res => {
        wx.showToast({
          title: '保存成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
      }, 1000)
      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
});
