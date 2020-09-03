//导入自定义数据库模块
const db = require('../db/index');
// 导入path路径模块
const path = require('path');
// 发布新文章路由函数处理模块
module.exports.addArticle = (req, res) => {
    //验证表单数据
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数');
    // 上传数据库发布文章数据
    const articleInfo = {
        ...req.body,
        cover_img: path.join(__dirname, req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id,
    };

    // 实现发布文章的功能
    const insertStr = 'INSERT INTO ev_articles SET ?';
    db.query(insertStr, articleInfo, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('发布文章失败');
        res.cc('发布文章成功', 0);
    });

}