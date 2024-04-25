// pages/components/publish/publish.js
const api = require("../../../api"); //引入同意管理的接口js
const app = getApp(); //引入全局对象
import Toast from "/@vant/weapp/toast/toast"; //引入vant提示插件
const carAgecolumns = ['杭州', '宁波', '温州', '嘉兴', '湖州'];
// const citys = {
//   浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
//   福建: ['福州', '厦门', '莆田', '三明', '泉州'],
// };
const areaData = {
    province_list: {
        110000: "北京市",
        // 其他省份...
    },
    city_list: {
        110100: "北京市",
        // 其他城市...
    },
    county_list: {
        110101: "东城区",
        // 其他区县...
    },
};
Component({
    /**
     * 页面的初始数据
     */
    data: {
        brandCode: "",
        vehicleAge: "",
        price: "",
        fileList: [],
        remark: "",
        address: "",
        telephone: "",
        showPopup: false,
        popupType: '', //弹出框类型 brand：品牌型号， carAge: 车龄， carAddress：车辆位置
        areaData,
        column: [],
        carAgecolumns,
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
    },
    lifetimes: {
        attached() {
          this.getBrand('one')
        },
    },
    methods: {
        // 获取品牌型号
        getBrand(column, id = 0) {
            const param = {
                p_id: id,
            };
            api.getBrand(param)
                .then(({statusCode, data}) => {
                  if(statusCode === 200) {
                    console.log(data);
                    const _data = this.data.column
                    const values = data.data.map(item => ({id: item.id, text:item.name}));
                    if(column === 'one') {
                      _data[0] = {
                        values,
                        className: 'column1'
                      }
                      this.getBrand('two', values[0]?.id)
                    }
                    if(column === 'two') {
                      _data[1] = {
                        values,
                        className: 'column2',
                      }
                    }
                    this.setData({
                      column: _data
                    })
                  }
                })
                .catch((err) => console.log(err));
        },
        // 文件上传
        afterRead(e) {
          console.log(e);
          const file = e.detail.file
          const params = {
            filePath: file.url,
            formData: {
              file: file
            }
          }
          const fileList = this.data.fileList
          api.fileUpLoad(params).then(res => {
            const baseUrl = 'https://abc.frezz.top/'
            const {data} = JSON.parse(res.data)
            console.log(3333, data)
            const obj = {
              url: baseUrl + data[0].file_path,
              name: data[0].file_name,
              isImage: true,
              deletable: true
            }
            fileList.push(obj);
            this.setData({
              fileList
            })
            console.log(1111, JSON.parse(res.data));
          }).catch(err => {
            console.log(err);
          })
        },
        // 点击品牌型号
        brandCodeChange() {
          this.getBrand('one');
          this.setData({
            showPopup: true,
            popupType: 'brand'
          })
        },
        // 点击车龄
        carAgeChange() {
          this.setData({
            showPopup: true,
            popupType: 'carAge',
            column:['1', '2', '3', '4', '5']
          })
        },
        // 选项改变时触发
        pickerChange(e) {
          const type = this.data.popupType
          if(type === 'brand') {
            const id = e.detail.value[0].id
            this.getBrand('two', id)
          }
        },
        // 取消
        pickerCancel() {
          this.setData({
            showPopup: false
          })
        },
        // 确认
        pickerOk(e) {
          const type = this.data.popupType
          if(type === 'brand') {
            const value = e.detail?.value.map(item => item.text);
            this.setData({
              brandCode: value.join('/'),
              showPopup: false
            })
          }
          if(type === 'carAge') {
            console.log(e)
            this.setData({
              vehicleAge: e.detail.value,
              showPopup: false
            })
          }
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
