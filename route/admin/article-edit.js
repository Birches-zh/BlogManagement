let { Article } = require('../../model/article');
module.exports = async(req, res) => {
    // 标识，标识当前访问是文章管理页面
    req.app.locals.currentLink = 'article';
    const id = req.query.id;
    if(id){
       let article = await Article.findOne({_id:id});
        res.render('admin/article-edit.art',{
            button:'修改',
            article:article,
            link:'/admin/article-modify?id=' +id
        });
    }else{
        
        res.render('admin/article-edit.art',{
            button:'提交',
            link:'/admin/article-add'
        });
    }
}