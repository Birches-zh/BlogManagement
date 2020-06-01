var { User } = require('../../model/user.js');
module.exports = async (req, res) => {
    // 标识，标识当前访问是用户管理页面
    req.app.locals.currentLink = 'user';
    const { message, id } = req.query
    if (id) {
        let user = await User.findOne({ _id: id });
        console.log(user);
        res.render('admin/user-edit.art', {
            message: message,
            user: user,
            button: '修改',
            link: '/admin/user-modify?id=' + id
        })
    } else {
        res.render('admin/user-edit.art', {
            message: message,
            button: '添加',
            link: '/admin/user-edit'
        })
    }

}