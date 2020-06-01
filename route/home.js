const express = require('express');
const home = express.Router();

// 博客前台文章详情展示页面
home.get('/index',require('./home/index.js'))
home.get('/article',require('./home/article.js'))
home.post('/comment',require('./home/comment.js'))


module.exports = home;