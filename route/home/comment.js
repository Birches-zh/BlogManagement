const { Comment } = require('../../model/comment');
module.exports = (req, res) => {
    const { content, uid, aid } = req.body;
    Comment.create({
        content:content,
        uid:uid,
        aid:aid,
        time:new Date()
    })
    //重定向
    res.redirect('/home/article?id=' + aid)
}