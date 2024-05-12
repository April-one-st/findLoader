// pages/realName/realName.js
import { fileUpLoadUrl, aduitUrl } from "../../utils/api";
const { fetch } = require("../../utils/util");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isFileList: [],
        thsFileList: [],
        name: "",
        id: "",
        isReal: false
    },
    //   姓名
    nameChange(e) {
        this.setData({
            name: e.detail,
        });
    },
    //   身份证
    idChange(e) {
        this.setData({
            id: e.detail,
        });
    },
    // 文件上传
    afterRead(e) {
        console.log(e);
        const type = e.target.dataset.extraParam;
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
                console.log(res)
                const { data } = JSON.parse(res.data);
                const obj = {
                    url: baseUrl + data[0].file_path,
                    name: data[0].file_name,
                    isImage: true,
                    deletable: true,
                    id: data[0].id,
                };
                _data.push(obj);
                if (type === "is") {
                    this.setData({
                        isFileList: _data,
                    });
                }
                if (type === "the") {
                    this.setData({
                        theFileList: _data,
                    });
                }
            })
            .catch((err) => {
                throw err;
            });
    },
    // 删除图片
    delFileList(key) {
        const type = key.target.dataset.extraParam;
        const detail = key.detail;
        if (type === "is") {
            const data = this.data.isFileList;
            const list = data.filter((item, index) => index !== detail.index);
            this.setData({
                isFileList: list,
            });
        }
        if (type === "the") {
            const data = this.data.theFileList;
            const list = data.filter((item, index) => index !== detail.index);
            this.setData({
                theFileList: list,
            });
        }
    },
    checkId(str) {
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    checkForm() {
        if (!this.data.name) {
            wx.showToast({
                title: "请输入姓名！",
                icon: "none",
            });
            return false;
        }
        if (!this.data.id) {
            wx.showToast({
                title: "请输入身份证号",
                icon: "none",
            });
            return false;
        }
        if (!this.checkId(this.data.id)) {
            wx.showToast({
                title: "身份证号格式不正确，请重新输入！",
                icon: "none",
            });
            this.setData({
                id: "",
            });
            return false;
        }
        if (this.data.isFileList.length == 0) {
            wx.showToast({
                title: "请上传身份证人像面！",
                icon: "none",
            });
            return false;
        }
        if (this.data.theFileList.length == 0) {
            wx.showToast({
                title: "请上传身份证国徽面！",
                icon: "none",
            });
            return false;
        }
        return true;
    },

    submit() {
        if (!this.checkForm()) return;
        const params = {
            audit_type: 1,
            name: this.data.name,
            card: this.data.id,
            image_desc: [...this.data.isFileList, ...this.data.theFileList].map(
                (item) => item.id
            ),
        };
        fetch
            .post(aduitUrl, params)
            .then((res) => {
                wx.navigateBack({
                  delta: 1 // 返回的页面数，1表示返回上一页，2表示返回上两页，依此类推
                })
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
      if (card) {
          this.setData({
              isReal: true,
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
