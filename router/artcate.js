// 导入第三方express包
const express = require('express');
// 创建路由对象
const router = express.Router();
// 导入路由处理函数
const artCate_Handle = require('../router_Handle/artcate');
//导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate');
// 挂载路由——获取文章分类列表
router.get('/cates', artCate_Handle.getArticleCates);
//挂载路由——新增文章分类的功能
router.post('/addcates', expressJoi(add_cate_schema), artCate_Handle.addArticleCates);
// 挂载路由——根据ID删除文章分类
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artCate_Handle.deleteCateById);
// 挂载路由——根据ID获取文章分类数据
router.get('/cates/:id', expressJoi(get_cate_schema), artCate_Handle.getArticleById);
//挂在路由——根据ID更新文章分类数据
router.post('/updatecate', expressJoi(update_cate_schema), artCate_Handle.updateCateById);
//暴露接口
module.exports = router;