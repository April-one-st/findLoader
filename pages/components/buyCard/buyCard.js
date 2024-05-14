// pages/components/buyCard/buyCard.js
import {
    getHomeListUrl,
    auditInfoUrl,
    getBrandCodeUrl,
} from "../../../utils/api";
const { fetch } = require("../../../utils/util");
const { areaList } = require("../../../utils/areaList");

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 这里是组件属性的定义
        text: {
            type: String,
            value: "default text",
            areaData: areaList,
        },
        getCurrentPage: {
            type: Function,
            value: function () {},
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        brandOptions: [],
        modelOptions: [],
        yearOptions: [
            { text: "1", value: "1" },
            { text: "2", value: "2" },
            { text: "3", value: "3" },
            { text: "4", value: "4" },
            { text: "5", value: "5" },
        ],
        districtValue: [],
        brandValue: "",
        modelValue: "",
        yearValue: "",
        cardList: [],
        areaList: areaList,
        areaTitle: "全国",
        tagList: [],
        total: 10,
        currentPage: 1,
        pageSize: 10,
        showTips: false,
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
        const isTrue = wx.getStorageSync('isFirst')
        console.log(isTrue);
        if(!isTrue) {
          wx.setStorageSync('isFirst', true)
          this.getDataList();
        }else{
          const list = wx.getStorageSync('cardList')
          this.setData({
            cardList: list
          })
        }
        this.getBrand("one");
        this.getAuditInfo();
        this.timer = setInterval(() => {
          this.getDataListNumber()
        }, 10000)
    },
    detached() {
      // 组件被卸载时触发
      clearInterval(this.timer)
      // 在这里执行清理操作
    },

    /**
     * 组件生命周期函数-在组件布局完成后执行，此时可以获取节点信息
     */
    ready() {
        console.log("Component ready");
    },

    /**
     * 组件生命周期函数-在组件实例被移动到节点树另一个位置时执行
     */
    moved() {
        console.log("Component moved");
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleScroll(e) {
          const hei = this.data.cardList.length * 300;
          if(hei - e.detail.scrollTop < 500 && this.data.total < this.data.cardList.length) {
            this.setData({
              currentPage: this.data.currentPage + 1
            })
            this.getDataList()
          }
        },
        getAuditInfo() {
            fetch
                .get(auditInfoUrl, { audit_type: 1 })
                .then((res) => {
                    wx.setStorageSync("card", res.data?.data?.card);
                    wx.setStorageSync("cardState", res.data?.data?.state);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        toCurrentPage(value) {
            console.log(value.detail);
            this.triggerEvent("customEvent", value.detail);
        },
        // 重置
        reset() {
            this.setData({
                districtValue: [],
                brandValue: "",
                modelValue: "",
                tagList: [],
                cardList: []
            });
            this.getDataList();
        },
        // 获取list数量
        getDataListNumber() {
          let province = "";
          let city = "";
          if (this.data.districtValue.length) {
              province = this.data.districtValue[0].name;
              city = this.data.districtValue[1].name;
          }
          const params = {
              province,
              city,
              brand: this.data.brandValue,
              brand_type: this.data.modelValue,
              per_page: this.data.pageSize,
              page: this.data.currentPage,
          };
          fetch
              .get(getHomeListUrl, params)
              .then((res) => {
                  if(res.data.data.total > this.data.total) {
                    this.setData({
                      showTips: true
                    })
                  }
              })
              .catch((err) => {
                  console.log(err);
              });
      },
        // 获取list数据
        getDataList() {
            let province = "";
            let city = "";
            if (this.data.districtValue.length) {
                province = this.data.districtValue[0].name;
                city = this.data.districtValue[1].name;
            }
            const params = {
                province,
                city,
                brand: this.data.brandValue,
                brand_type: this.data.modelValue,
                per_page: this.data.pageSize,
                page: this.data.currentPage,
            };
            fetch
                .get(getHomeListUrl, params)
                .then((res) => {
                  const list = res.data.data.list
                    this.setData({
                        cardList: [...this.data.cardList, ...list],
                        total: res.data.data.total,
                        showTips: false
                    });
                    wx.setStorageSync('cardList', [...this.data.cardList])
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 获取品牌型号
        getBrand(column, id = 0) {
            const param = {
                p_id: id,
            };
            fetch
                .get(getBrandCodeUrl, param)
                .then(({ statusCode, data }) => {
                    if (statusCode === 200) {
                        const values = data.data.map((item) => ({
                            value: [item.id, item.name],
                            text: item.name,
                        }));
                        if (column === "one") {
                            this.setData({
                                brandOptions: values,
                            });
                            this.getBrand("two", values[0][0]?.id);
                        }
                        if (column === "two") {
                            this.setData({
                                modelOptions: values,
                            });
                        }
                    }
                })
                .catch((err) => console.log(err));
        },
        // 添加筛选标签数据
        setTagData(type, obj) {
            if (this.data.tagList.some((item) => item.id === type)) {
                const list = this.data.tagList.map((item) => {
                    if (item.id === type) {
                        return obj;
                    } else {
                        return item;
                    }
                });
                console.log(111, list);
                this.setData({
                    tagList: list,
                });
            } else {
                const _data = this.data.tagList;
                _data.push(obj);
                this.setData({
                    tagList: _data,
                });
            }
        },
        // 地区chage
        addressOk(e) {
            const _data = e.detail.values;
            console.log(_data);
            this.setData({
                districtValue: _data,
                areaTitle: _data.map((value) => value.name).join("."),
                cardList: []
            });
            this.selectComponent("#gender").toggle(false);
            this.getDataList();
        },
        // 地区取消
        addressCancel() {
            this.selectComponent("#gender").toggle(false);
        },
        // 品牌change
        brandChange(e) {
            this.setTagData("brandValue", {
                id: "brandValue",
                name: e.detail[1],
            });
            this.setData({
                brandValue: e.detail,
                cardList: []
            });
            this.getBrand("two", e.detail[0]);
            this.getDataList();
        },
        // 型号change
        modelChange(e) {
            this.setTagData("modelValue", {
                id: "modelValue",
                name: e.detail[1],
            });
            this.setData({
                modelValue: e.detail,
                cardList: []
            });
            this.getDataList();
        },
        // 更改年限
        yearValueChange(e) {
            this.setTagData("yearValue", {
                id: "yearValue",
                name: e.detail,
            });
            this.setData({
                yearValue: e.detail,
                cardList: []
            });
            this.getDataList();
        },
        // 标签关闭
        tagClose(e) {
            console.log(e);
            const _data = this.data.tagList.filter(
                (item) => item.id !== e.target.id
            );
            this.setData({
                tagList: _data,
                [e.target.id]: "",
            });
            this.getDataList();
        },
    },
});
