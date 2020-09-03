//导入数据库模块
const db = require('../db/index');

//获取文章分类列表处理函数
module.exports.getArticleCates = (req, res) => {
    //获取文章分类列表
    const selectStr = 'SELECT * FROM ev_article_cate WHERE id_delete=0 ORDER BY Id ASC';
    db.query(selectStr, (err, results) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            msg: '获取文章列表成功',
            data: results,
        });
    });
};
//新增文章分类的功能
module.exports.addArticleCates = (req, res) => {
    // 查询 分类名称 与 分类别名 是否被占用
    const selectStr = 'SELECT * FROM ev_article_cate WHERE name=? OR alias=?';
    db.query(selectStr, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err);
        if (results.length === 2) return res.cc('分类名称和分类别名被占用，请更换后重试');
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换分类名称');
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换分类别名');
        // 实现新增文章分类的功能
        const insertStr = 'INSERT INTO ev_article_cate SET ?'
        db.query(insertStr, { name: req.body.name, alias: req.body.alias }, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败');
            res.cc('新增文章分类成功', 0);
        })
    });
};
//根据id删除文章分类
module.exports.deleteCateById = (req, res) => {
    console.log(req.params.id);
    const upDateStr = 'UPDATE ev_article_cate SET id_delete=1 WHERE Id=?';
    db.query(upDateStr, req.params.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败');
        res.cc('删除文章分类成功', 0);

    });
};
//根据id获取文章分类数据
module.exports.getArticleById = (req, res) => {
    const selectStr = 'SELECT * FROM ev_article_cate WHERE Id=? AND id_delete=0';
    db.query(selectStr, req.params.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('获取分章分类失败');
        return res.send({
            status: '0',
            msg: '获取文章分类成功',
            data: results[0],
        });
    });
};
//根据id更新文章分类的数据
module.exports.updateCateById = (req, res) => {
    // 查询 分类名称 与 分类别名 是否被占用
    const selectStr = 'SELECT * FROM ev_article_cate WHERE id<>? AND (name=? OR alias=?)';
    db.query(selectStr, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        console.log(req.body);
        if (err) return res.cc(err);
        if (results.length === 2) return res.cc('分类名称和分类别名被占用，请更换后重试');
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换分类名称');
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换分类别名');
        // 实现更新文章分类的功能
        const upDateStr = 'UPDATE ev_article_cate SET ? WHERE id=?';
        db.query(upDateStr, [req.body, req.body.id], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败');
            res.cc('更新文章分类成功', 0);
        });
    });
};