// 引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article.js');
module.exports = (req, res) => {
    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.设置文件上传路径
    form.uploadDir = path.join(__dirname,'../','../','public','uploads');
    // 3.是否保留拓展名
    form.keepExtensions = true;
    // 4.解析表单
    form.parse(req,async (err,fields,files) =>{
        // 1.err 错误对象
        // 2.fields 对象类型 保存普通表单数据
        // 3.files 对象类型 保存了和上传文件相关的数据
        // res.send(files.cover.path.split('public')[1]);//通过字符串截取，把图片的路径截取出来，去除死路径，在路径最前面加个/
        await Article.create({
            title:fields.title,
            author:fields.author,
            publishDate:fields.publishDate,
            cover:files.cover.path.split('public')[1],
            content:fields.content
        })
        res.redirect('/admin/article')
    })
}