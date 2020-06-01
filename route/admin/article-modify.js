const formidable = require('formidable');
const path = require('path');
const { Article } =require('../../model/article');
module.exports =async (req, res) => {
    const id = req.query.id;
    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.设置文件上传路径
    form.uploadDir = path.join(__dirname,'../','../','public','uploads');
    // 3.是否保留拓展名
    form.keepExtensions = true;
    // 4.解析表单
    form.parse(req,async (err,fields,files)=>{
        await Article.findOneAndUpdate({_id:id},{
            title:fields.title,
            author:fields.author,
            publishDate:fields.publishDate,
            content:fields.content,
            cover:files.cover.path.split('public')[1]
        })
        res.redirect('/admin/article')
    })

}