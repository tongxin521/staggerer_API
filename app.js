// 导入express第三方包
const express = require('express');
// 创建服务器实例对象
const app = express();
// 导入被配置cors跨域中间件
const cors = require('cors');
app.use(cors());
//导入并配置了表单的请求处理
app.use(express.urlencoded({ extended: false }));
//定义静态资源文件
app.use('/uploads', express.static('./uploads'));

// 导入密钥config密钥
const config = require('./config');
//导入用于将客户端发送过来的JWT字符串，解析还原为JSONP对象的包
const expressJWT = require('express-jwt');
// 注册解析JWT字符串
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }));


// 响应数据中间件
app.use(function(req, res, next) {
    res.cc = function(err, status = 1) {
        res.send({
            status,
            msg: err instanceof Error ? err.message : err,
        });
    };
    next();
});


// 为表单中携带的数据项，定义验证规则
const Joi = require('@hapi/joi');

//导入自定义登陆注册路由模块
const userRouter = require('./router/user');
// 注册接口
app.use('/api', userRouter);
//导入个人中心路由模块
const userinfoRouter = require('./router/userinfo');
// 注册接口
app.use('/my', userinfoRouter);
// 导入文章类别管理
const artCateRouter = require('./router/artcate');
//注册接口
app.use('/my/article', artCateRouter);
// 导入发布文章路由模块
const articleRouter = require('./router/article');
// 注册接口
app.use('/my/article', articleRouter);


// 创建全局错误中间件
app.use((err, req, res, next) => {
    //数据验证失败
    if (err instanceof Joi.ValidationError) return res.cc(err);

    if (err.name === 'UnauthorizedError') {
        return res.send({ status: '401', message: '无效的token' });
    }
    // 未知错误
    res.cc(err);
});


//开启服务器
app.listen(80, () => {
    console.log('http://127.0.0.1:80');
})