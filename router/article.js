//导入express第三方包
const express = require('express');
//导入解析formdata格式表单数据的包
const multer = require('multer');
// 导入path路径模块
const path = require('path');
//配置multer
const upload = multer({ dest: path.join(__dirname, '../uploads') });
//导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi');
//接收验证规则的模块
const { add_article_schema } = require('../schema/article');
//定义路由对象
const router = express();
// 导入路由函数处理模块
const article_Handle = require('../router_Handle/article');
//挂载路由——发布新文章张
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_Handle.addArticle);
module.exports = router;