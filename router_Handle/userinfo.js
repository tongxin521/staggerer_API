//导入数据库模块
const db = require('../db/index');
//导入bcryptjs模块
const bcrypt = require('bcryptjs');
//获取用户的基本信息处理函数
module.exports.getUserInfo = (req, res) => {
    // 定义查询用户信息的字符串
    const selectStr = 'SELECT id,username,nickname,email,user_pic FROM ev_users WHERE id=?';
    db.query(selectStr, req.user.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('获取用户信息失败');
        res.send({
            status: '0',
            msg: '获取用户信息成功',
            data: results[0],
        });
    });
};

//更新用户的基本信息处理函数
module.exports.updateUserInfo = (req, res) => {
    const updateStr = 'UPDATE ev_users SET ? WHERE id=?';
    db.query(updateStr, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('用户的基本信息更新失败');
        res.cc('用户的基本信息更新成功', 0);
    });
};
//重置密码处理函数
module.exports.updatePassword = (req, res) => {
    // 根据 id 查询用户是否存在：req.user.id
    const selectStr = 'SELECT * FROM ev_users WHERE id=?';
    db.query(selectStr, req.user.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('用户不存在');
        //判断提交的 旧密码 是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
        if (!compareResult) return res.cc('原始密码输入错误，请重新输入');
        // 对新密码进行 bcrypt 加密之后，
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
        //更新到数据库中
        const updateStr = 'UPDATE ev_users SET password=? WHERE id=?';
        db.query(updateStr, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更改密码失败');
            res.cc('更改密码成功', 0);
        });
    })
};
//更新用户头像处理函数
module.exports.updateAvatar = (req, res) => {
    const updateStr = 'UPDATE ev_users SET ? WHERE id=?';
    db.query(updateStr, [{ user_pic: req.body.avatar }, req.user.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('更换头像失败');
        res.cc('更换头像成功', 0);
    });
};