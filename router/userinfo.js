//引入express第三方包
const express = require('express');
// 导入路由函数处理模块
const userinfoHandle = require('../router_Handle/userinfo');
// 创建路由对象
const router = express.Router();
// 挂载路由——获取用户的基本信息
router.get('/userinfo', userinfoHandle.getUserInfo);
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user');
// 挂载路由——更新用户的基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfoHandle.updateUserInfo);
// 挂载路由——重置密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfoHandle.updatePassword);
// 挂载路由——更换头像
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfoHandle.updateAvatar);
//向外共享路由对象
module.exports = router;