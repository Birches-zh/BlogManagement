const { Article } = require('../../model/article');
// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    req.app.locals.currentLink = 'article';
    // 接收客户端传递过来的页码
    let page = req.query.page || 1;
    // 标识，标识当前访问是文章管理页面
    // page()表示当前页
    // size()表示每页显示的条数
    // display()指定显示的页码数量
    // exec()向数据库中发送查询请求
    // 查询所有文章数据
    let articles = await pagination(Article).find().page(page).size(10).display(3).populate('author').exec();
    // console.log(articles);
    res.render('admin/article.art',{
        articles:articles
    });
}