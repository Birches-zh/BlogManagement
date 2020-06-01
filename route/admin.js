const express = require('express');
const admin = express.Router();

// 渲染登录页面
admin.get('/login', require('./admin/loginPage.js'));
// 实现登录功能
admin.post('/login', require('./admin/login.js'));
// 用户列表路由
admin.get('/user', require('./admin/userPage.js'));
// 实现退出功能
admin.get('/logout',require('./admin/logout.js'));
// 创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit.js'));
// 实现添加用户功能
admin.post('/user-edit', require('./admin/user-edit-fn.js'));
// 实现用户修改用户功能
admin.post('/user-modify', require('./admin/user-modify.js'));
// 实现删除用户功能
admin.get('/user-delete',require('./admin/userDelete.js'));
// 文章列表页面路由
admin.get('/article',require('./admin/article.js'));
// 文章编辑页面路由
admin.get('/article-edit',require('./admin/article-edit.js'));
// 实现文章添加功能的路由
admin.post('/article-add',require('./admin/article-add.js'));
// 实现文章修改功能路由
admin.post('/article-modify',require('./admin/article-modify.js'));
admin.get('/article-delete',require('./admin/article-delete.js'))

admin.get('/article', (req, res) => {
    res.render('admin/article.art')
})

admin.get('/article-edit', (req, res) => {
    res.render('admin/article-edit.art')
})
module.exports = admin;