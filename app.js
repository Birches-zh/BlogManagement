const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const dateFormat = require('dateformat');
const template = require('art-template');
require('./model/connect.js');
require('./model/user.js');
// 导入morgan第三方模块
const morgan = require('morgan');
// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');
// 导入config模块
const config = require('config');


// 配置
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
// 向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;
// 配置session,saveUninitialized是防止没登录的时候存储了cookies
app.use(session({ 
    secret: 'secret key',
    saveUninitialized:false,
    cookie:{
        maxAge:24 *60 *60*1000
    }
}));

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))

console.log(config.get('title'))

// 获取系统环境变量 返回值是对象
if(process.env.NODE_ENV == 'development'){
    console.log('开发环境');
    // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
   app.use(morgan('dev'))
}else{
    console.log('生产环境')
}


app.use('/admin', require('./middleware/loginGuard.js'))
// 为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);
// 处理错误的中间件
app.use((err, req, res, next) => {
    // 将字符串对象转换为对象类型
    const result = JSON.parse(err);
    let params = [];
    for(attr in result){
        if(attr != 'path'){
            params.push(attr + '=' + result[attr])
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

// 监听端口
app.listen(80);
console.log('服务器启动成功')
