// pages/components/publish/publish.js
import Toast from "@vant/weapp/toast/toast";
import { getBrandCodeUrl, fileUpLoadUrl, publishUrl } from "../../../utils/api";
const { fetch } = require("../../../utils/util");
const { areaList } = require("../../../utils/areaList");
Component({
    properties: {
        getCurrentPage: {
            type: Function,
            value: function () {},
        },
    },
    /**
     * 页面的初始数据
     */
    data: {
        brandCode: "",
        vehicleAge: "",
        price: "",
        fileList: [],
        remark: "",
        address: [],
        telephone: "",
        showPopup: false,
        popupType: "", //弹出框类型 brand：品牌型号， carAge: 车龄， carAddress：车辆位置
        areaData: areaList,
        column: [],
        carAgecolumns: [],
        actions: [
            {
                name: "选项1",
                value: "0",
            },
            {
                name: "选项2",
                value: "1",
            },
            {
                name: "选项3",
                value: "2",
            },
        ],
        verifyBrandCode: false,
        verifyVehicleAge: false,
        verifyPrice: false,
        verifyAddress: false,
        verifyTelephone: false,
        showReal: false,
    },
    lifetimes: {
        attached() {
            this.getBrand("one");
            let card = wx.getStorageSync("card");
            if (!card) {
                this.setData({
                    showReal: true,
                });
            }
        },
    },
    methods: {
        // 获取品牌型号
        getBrand(column, id = 0) {
            const param = {
                p_id: id,
            };
            fetch
                .get(getBrandCodeUrl, param)
                .then(({ statusCode, data }) => {
                    if (statusCode === 200) {
                        console.log(data);
                        const _data = this.data.column;
                        const values = data.data.map((item) => ({
                            id: item.id,
                            text: item.name,
                        }));
                        if (column === "one") {
                            _data[0] = {
                                values,
                                className: "column1",
                            };
                            this.getBrand("two", values[0]?.id);
                        }
                        if (column === "two") {
                            _data[1] = {
                                values,
                                className: "column2",
                            };
                        }
                        this.setData({
                            column: _data,
                        });
                    }
                })
                .catch((err) => console.log(err));
        },
        // 文件上传
        afterRead(e) {
            console.log(e);
            const file = e.detail.file;
            const fileList = this.data.fileList;
            const list = file.map((item) => {
                const params = {
                    filePath: item.url,
                    formData: {
                        file: item,
                    },
                };
                return fetch
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
                        return obj
                        // fileList.push(obj);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
            Promise.all(list).then(res => {
              this.setData({
                fileList: res,
            });
            })
        },
        // 价格
        priceChange(e) {
            this.setData({
                price: e.detail,
                verifyPrice: false,
            });
        },
        // 描述
        remarkChange(e) {
            this.setData({
                remark: e.detail,
            });
        },
        // 车辆位置
        addressChange(e) {
            this.setData({
                showPopup: true,
                popupType: "carAddress",
            });
        },
        // 手机号码
        telephoneChange(e) {
            this.setData({
                telephone: e.detail,
                verifyTelephone: false,
            });
        },
        // 点击品牌型号
        brandCodeChange() {
            this.getBrand("one");
            this.setData({
                showPopup: true,
                popupType: "brand",
            });
        },
        // 点击车龄
        carAgeChange() {
            this.setData({
                showPopup: true,
                popupType: "carAge",
                column: ["1", "2", "3", "4", "5"],
            });
        },
        // 选项改变时触发
        pickerChange(e) {
            const type = this.data.popupType;
            if (type === "brand") {
                const id = e.detail.value[0].id;
                this.getBrand("two", id);
            }
        },
        // 取消
        pickerCancel() {
            this.setData({
                showPopup: false,
            });
        },
        // 确认
        pickerOk(e) {
            const type = this.data.popupType;
            if (type === "brand") {
                const value = e.detail?.value.map((item) => item.text);
                this.setData({
                    brandCode: value.join("/"),
                    showPopup: false,
                    verifyBrandCode: false,
                });
            }
            if (type === "carAge") {
                console.log(e);
                this.setData({
                    vehicleAge: e.detail.value,
                    showPopup: false,
                    verifyVehicleAge: false,
                });
            }
        },
        // 弹出层取消
        popupClose() {
            this.setData({
                showPopup: false,
            });
        },
        // 地址取消
        addressCancel() {
            this.setData({
                showPopup: false,
            });
        },
        // 地址确认
        addressOk(e) {
            const value = e.detail.values;
            this.setData({
                address: value.map((item) => item.name),
                showPopup: false,
                verifyAddress: false,
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
        // 表单提交
        sumbit() {
            let card = wx.getStorageSync("card");
            if (!card) {
                this.setData({
                    showReal: true,
                });
            }
            if (!this.formVerify()) return;
            const data = this.data;
            console.log(data.fileList);
            const params = {
                brand: data.brandCode.split("/")[0],
                brand_type: data.brandCode.split("/")[1],
                year: data.vehicleAge * 1,
                price: !data.price ? 0 : Number(data.price),
                desc: data.remark,
                province: data.address[0],
                city: data.address[1],
                position: data.address[2],
                phone: data.telephone,
                image_desc: data.fileList.map((item) => item.id),
            };
            fetch
                .post(publishUrl, params)
                .then((res) => {
                    if (res.statusCode === 200) {
                        Toast({
                            context: this,
                            type: "success",
                            message: "发布成功",
                        });
                        setTimeout(() => {
                            this.triggerEvent("customEvent", "买车");
                        }, 1000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 表单校验
        formVerify() {
            const data = this.data;
            const verify = {
                brandCode: false,
                vehicleAge: false,
                price: false,
                remark: false,
                address: false,
                telephone: false,
            };
            let result = true;
            if (data.fileList.length < 4 || data.fileList.length > 18) {
                Toast({
                    context: this,
                    type: "error",
                    message: "图片数量请保持在4-18之间",
                });
            }
            if (!data.brandCode) {
                verify.brandCode = true;
                result = false;
            }
            if (!data.vehicleAge) {
                verify.vehicleAge = true;
                result = false;
            }
            if (!data.price) {
                verify.price = true;
                result = false;
            }
            if (!data.address.length) {
                verify.address = true;
                result = false;
            }
            if (!data.telephone) {
                verify.telephone = true;
                result = false;
            }
            this.setData({
                verifyBrandCode: verify.brandCode,
                verifyVehicleAge: verify.vehicleAge,
                verifyPrice: verify.price,
                verifyAddress: verify.address,
                verifyTelephone: verify.telephone,
            });
            return result;
        },
        //   实名认证页面
        toRealNamePage() {
            wx.navigateTo({
                url: "/pages/realName/realName",
            });
        },
        // 求购页面
        toAskBuyPage() {
            wx.navigateTo({
                url: "/pages/askBuy/askBuy",
            });
        },
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
});
