const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    await Article.findOneAndRemove({_id:req.query.id});
    res.redirect('/admin/article');
}