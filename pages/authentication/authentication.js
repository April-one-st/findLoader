// pages/authentication/authentication.js
import { fileUpLoadUrl, merchantUrl } from "../../utils/api";
const { fetch } = require("../../utils/util");

Page({
    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        phone: "",
        fileList: [],
        showReal: false,
    },

    inputName(e) {
        this.setData({
            name: e.detail,
        });
    },

    inputPhone(e) {
        this.setData({
            phone: e.detail,
        });
    },
    //   实名认证页面
    toRealNamePage() {
        wx.navigateTo({
            url: "/pages/realName/realName",
        });
    },
    // 文件上传
    afterRead(e) {
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
        const detail = key.detail;
        const data = this.data.fileList;
        const list = data.filter((item, index) => index !== detail.index);
        this.setData({
            fileList: list,
        });
    },
    checkPhone(str) {
        const reg = /^1[3456789]\d{9}$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    },

    checkForm() {
        if (this.data.name == "") {
            wx.showToast({
                title: "请输入商家名称！",
                icon: "none",
            });
            return false;
        }
        if (this.data.phone == "") {
            wx.showToast({
                title: "请输入联系电话！",
                icon: "none",
            });
            return false;
        }
        if (!this.checkPhone(this.data.phone)) {
            wx.showToast({
                title: "手机号格式不正确，请重新输入！",
                icon: "none",
            });
            this.setData({
                phone: "",
            });
            return false;
        }
        if (this.data.fileList.length == 0) {
            wx.showToast({
                title: "请上传营业执照！",
                icon: "none",
            });
            return false;
        }
        return true;
    },

    submit() {
        if (!this.checkForm()) return;
        const params = {
            audit_type: 2,
            name: this.data.name,
            phone: this.data.phone,
            image_desc: this.data.fileList.map((item) => item.id),
        };
        fetch
            .post(merchantUrl, params)
            .then((res) => {
                wx.showToast({
                    title: "提交成功",
                    icon: "success",
                });
            })
            .catch((err) => {
                throw err;
            });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let card = wx.getStorageSync("card");
        console.log(card);
        if (!card) {
            this.setData({
                showReal: true,
            });
        }
    },

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
