const { Article } = require('../../model/article.js');

const { Comment } =require('../../model/comment.js');
module.exports = async (req, res) => {
    const id = req.query.id;
    let article = await Article.findOne({_id: id }).populate('author');

    let comments = await Comment.find({aid:id }).populate('uid');
    res.render('home/article.art',{
        article:article,
        comments:comments
    })

}