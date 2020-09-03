//导入自定义数据库模块
const db = require('../db/index');
// 导入第三方加密包
const bcrypt = require('bcryptjs');
//导入用于生成JWT字符串的包
const jwt = require('jsonwebtoken');
// 导入密钥包
const config = require('../config');
//注册函数处理模块
module.exports.regUser = (req, res) => {
    const userInfo = req.body;
    // 1. 检测表单数据是否合法 
    // if (!userInfo.username || !userInfo.password) {
    //     return res.cc('用户名或者密码不合法');
    // };
    const selectStr = 'SELECT * FROM ev_users WHERE username=?'
        // 2. 检测用户名是否被占用 
    db.query(selectStr, userInfo.username, (err, results) => {
        //查询失败
        if (err) res.cc(err);
        if (results.length > 0) {
            return res.cc('用户名被占用,请更换其他用户名');
        };
        // TODO:对密码进行加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10);
        //插入新用户
        const insertStr = 'INSERT INTO ev_users SET ?';
        db.query(insertStr, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            if (err) res.cc(err);
            res.cc('添加成功', 0);
        });

    });

};
//登录函数处理模块
module.exports.login = (req, res) => {
    const insertStr = 'SELECT * FROM ev_users WHERE username=?';
    const userInfo = req.body;
    // 2. 根据用户名查询用户的数据
    db.query(insertStr, userInfo.username, (err, results) => {
        if (err) return res.cc(err);
        if (results.length <= 0) {
            return res.cc('用户名不存在，请重新输入');
        };
        // 3. 判断用户输入的密码是否正确
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password);
        if (!compareResult) return res.cc('密码错误，请重新输入');
        // 获取用户信息，剔除密码和头像的值
        const user = {...results[0], password: '', user_pic: '' };
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '10h' });
        //4.登陆成功  生成 JWT 的 Token 字符串
        res.send({
            status: 0,
            msg: '登陆成功',
            token: 'Bearer ' + tokenStr,
        });
    });
};