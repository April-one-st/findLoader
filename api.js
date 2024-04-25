const request = require("./request"); //引入封装好的js文件
module.exports = {
    // 文件上传
    fileUpLoad(data) {
        return request.upLoad("/api/v1/upload", data);
    },
    // 获取品牌型号
    getBrand(data) {
        return request.get("/api/v1/brand", data);
    },
    // 登录
    // login(data){
    //  return request.post('/user/login',data)
    // }
};
