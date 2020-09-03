//新建 /schema/user.js 用户信息验证规则模块
const joi = require('@hapi/joi');
//用户名验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();
//更新用户信息验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();
//更新用户头像验证规则
const avatar = joi.string().dataUri().required();
// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
    //表示需要对 req.body 中的数据进行验证
    body: {
        username,
        password,
    },
};
//更新用户信息表单的验证规则
exports.update_userinfo_schema = {
    //表示需要对 req.body 中的数据进行验证
    body: {
        id,
        nickname,
        email,
        username,
    },
};
//重置密码的表单验证规则
exports.update_password_schema = {
    //表示需要对 req.body 中的数据进行验证
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
        rePwd: joi.ref('newPwd'),
    },
};
//更新头像验证规则
exports.update_avatar_schema = {
    body: {
        avatar,
    },
};