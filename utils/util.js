const baseUrl = "https://www.zhaochanche.net"; //  服务器地址

// 标准带报错提示请求
const fetch = {
    http(url, method, data, header = { "content-type": "application/json" }) {
        console.log("请求url--->：", url);
        console.log("请求参数--->：", data);
        return new Promise((resolve, reject) => {
            let token = wx.getStorageSync("token");
            if(!token) {
              wx.showToast({
                title: '登陆失效！',
                icon: 'error'
              })
              wx.navigateTo({
                url: '/pages/logs/logs',
              })
              return
            }
            wx.request({
                url: baseUrl + url,
                method: method,
                data: method == "GET" ? data : JSON.stringify(data), // header这里根据业务情况自行选择需要还是不需要
                header: {'wx-token':token ,...header},
                success: (res) => {
                  console.log('res111', res)
                    if (res.data.code == 7) {
                        wx.showToast({
                          title: res.data.msg,
                          icon: 'error'
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
    },
    get(url, data, header) {
        return this.http(url, "GET", data, header);
    },
    post(url, data, header) {
        return this.http(url, "POST", data, header);
    },
    put(url, data, header) {
        return this.http(url, "PUT", data, header);
    },
    delete(url, data, header) {
        return this.http(url, "DELETE", data, header);
    },
    upload(
        url,
        data,
        header = {
            "Content-Type": "multipart/form-data", // 设置请求头
        }
    ) {
        return new Promise((resolve, reject) => {
          let token = wx.getStorageSync("token");
          if(!token) {
            wx.showToast({
              title: '登陆失效！',
              icon: 'error'
            })
            wx.navigateTo({
              url: '/pages/logs/logs',
            })
            return
          }
            wx.uploadFile({
                url: baseUrl + url, // 上传接口地址
                filePath: data.filePath, // 要上传的文件路径
                name: "file", // 服务器端接收文件的字段名
                formData: data.formData,
                header: {'wx-token':token ,...header},
                success: function (res) {
                    // 上传成功后的处理逻辑
                    if (res.data.code == 7) {
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

// 无提示高度自定义请求
const fetchDiy = {
    http(url, method, data, header = { "content-type": "application/json" }) {
        console.log("请求url--->：", url);
        console.log("请求参数--->：", data);
        return new Promise((resolve, reject) => {
            let token = wx.getStorageSync("token");
            if (token) {
                Object.assign(header, {
                    "X-Access-Token": token,
                });
                // header.token = token;
                wx.request({
                    url: baseUrl + url,
                    method,
                    data,
                    header,
                    success(res) {
                        console.log("请求结果--->：", res);
                        if (res.data.code === 200) {
                            resolve(res.data);
                        } else if (res.data.code === 401) {
                            const pages = getCurrentPages()[0].route;
                            if (pages == "pages/index/index") return;
                            wx.showModal({
                                title: "提示",
                                content: "登录已过期，请重新登录",
                                showCancel: false,
                                confirmText: "确定",
                                success(res) {
                                    if (res.confirm) {
                                        // token 已经失效，需要重新执行登录流程
                                        wx.reLaunch({
                                            url: "/pages/index/index",
                                        });
                                    }
                                },
                            });
                        } else {
                            resolve(res.data);
                        }
                    },
                    fail(err) {
                        reject(err);
                    },
                    complete: (datas) => {
                        wx.hideLoading();
                    },
                });
            } else {
                wx.checkSession({
                    success() {
                        //session_key 未过期，并且在本生命周期一直有效
                        wx.request({
                            url: baseUrl + url,
                            method,
                            data,
                            header,
                            success(res) {
                                if (res.data.code === 200) {
                                    resolve(res.data);
                                } else if (res.data.code === 401) {
                                    const pages = getCurrentPages()[0].route;
                                    if (pages == "pages/index/index") return;
                                    wx.showModal({
                                        title: "提示",
                                        content: "登录已过期，请重新登录",
                                        showCancel: false,
                                        confirmText: "确定",
                                        success(res) {
                                            if (res.confirm) {
                                                // token 已经失效，需要重新执行登录流程
                                                wx.reLaunch({
                                                    url: "/pages/index/index",
                                                });
                                            }
                                        },
                                    });
                                } else {
                                    resolve(res.data);
                                }
                            },
                            fail(err) {
                                reject(err);
                            },
                            complete: () => {
                                wx.hideLoading();
                            },
                        });
                    },
                    fail() {
                        // session_key 已经失效，需要重新执行登录流程
                        wx.reLaunch({
                            url: "/pages/index/index",
                        });
                    },
                });
            }
        });
    },

    get(url, data, header) {
        return this.http(url, "GET", data, header);
    },

    post(url, data, header) {
        return this.http(url, "POST", data, header);
    },

    put(url, data, header) {
        return this.http(url, "PUT", data, header);
    },

    delete(url, data, header) {
        return this.http(url, "DELETE", data, header);
    },

    upload(
        url,
        data,
        header = {
            "Content-Type": "multipart/form-data", // 设置请求头
        }
    ) {
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: baseUrl + url, // 上传接口地址
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
            // const token = wx.getStorageSync("token");
            // if (token) {
            //     Object.assign(header, {
            //         "X-Access-Token": token,
            //     });
            //     wx.uploadFile({
            //         url: baseUrl + url,
            //         filePath: filePath,
            //         name: "file",
            //         header: header,
            //         formData: formData,
            //         success(res) {
            //           resolve(res)
            //             // let uploadres = JSON.parse(res.data);
            //             // if (uploadres.code === 200) {
            //             //     resolve(uploadres);
            //             // } else if (uploadres.code === 401) {
            //             //     wx.showModal({
            //             //         title: "提示",
            //             //         content: "登录已过期，请重新登录",
            //             //         showCancel: false,
            //             //         confirmText: "确定",
            //             //         success(res) {
            //             //             if (res.confirm) {
            //             //                 // token 已经失效，需要重新执行登录流程
            //             //                 wx.reLaunch({
            //             //                     url: "/pages/index/index",
            //             //                 });
            //             //             }
            //             //         },
            //             //     });
            //             // } else {
            //             //     resolve(uploadres);
            //             // }
            //         },
            //         fail(err) {
            //             reject(err);
            //         },
            //     });
            // } else {
            //     wx.checkSession({
            //         success() {
            //             //session_key 未过期，并且在本生命周期一直有效
            //             wx.uploadFile({
            //                 url: baseUrl + url,
            //                 filePath: filePath,
            //                 name: "file",
            //                 header: header,
            //                 formData: formData,
            //                 success(res) {
            //                     let uploadres = JSON.parse(res.data);
            //                     if (uploadres.code === 200) {
            //                         resolve(uploadres);
            //                     } else if (uploadres.code === 401) {
            //                         wx.showModal({
            //                             title: "提示",
            //                             content: "登录已过期，请重新登录",
            //                             showCancel: false,
            //                             confirmText: "确定",
            //                             success(res) {
            //                                 if (res.confirm) {
            //                                     // token 已经失效，需要重新执行登录流程
            //                                     wx.reLaunch({
            //                                         url: "/pages/index/index",
            //                                     });
            //                                 }
            //                             },
            //                         });
            //                     } else {
            //                         resolve(uploadres);
            //                     }
            //                 },
            //                 fail(err) {
            //                     reject(err);
            //                 },
            //             });
            //         },
            //         fail() {
            //             // session_key 已经失效，需要重新执行登录流程
            //             wx.reLaunch({
            //                 url: "/pages/index/index",
            //             });
            //         },
            //     });
            // }
        });
    },
};

// 登录
const login = () => {
    wx.login({
        success(res) {
            fetch
                .post("/login", {
                    code: res.code,
                    appid: "",
                    secret: "",
                })
                .then((res) => {});
        },
    });
};

// 格式化日期
const formatTime = (date, splitStr = "/", noDate = false) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    if (noDate) return `${[year, month, day].map(formatNumber).join(splitStr)}`;
    return `${[year, month, day].map(formatNumber).join(splitStr)} ${[
        hour,
        minute,
        second,
    ]
        .map(formatNumber)
        .join(":")}`;
};

// 格式化数字
const formatNumber = (n) => {
    n = n.toString();
    return n[1] ? n : `0${n}`;
};

// 格式化浮点数
const fomatFloat = (num, n) => {
    let f = parseFloat(num);
    if (isNaN(f)) {
        return false;
    }
    f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂
    let s = f.toString();
    let rs = s.indexOf(".");
    // 判定如果是整数，增加小数点再补0
    if (rs < 0) {
        rs = s.length;
        s += ".";
    }
    while (s.length <= rs + n) {
        s += "0";
    }
    return s;
};

module.exports = {
    fetch,
    fetchDiy,
    login,
    formatTime,
    fomatFloat,
    baseUrl,
};
