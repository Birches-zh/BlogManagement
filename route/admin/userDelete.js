const { User } = require('../../model/user.js');
module.exports = async (req, res) => {
    // 删除某个数据
   await User.findOneAndDelete({_id:req.query.id})
    res.redirect('/admin/user');
}