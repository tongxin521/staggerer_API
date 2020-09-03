//导入express第三方包
const express = require('express');
// 创建router对象
const router = express.Router();
//导入用户路由函数处理模块
const userHandler = require('../router_Handle/user');
// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user');
// 挂载post注册路由请求
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser);
// 挂载post登录路由请求
router.post('/login', expressJoi(reg_login_schema), userHandler.login);

//暴露接口
module.exports = router;