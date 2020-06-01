const { User } = require('../../model/user.js')
module.exports = async (req, res) => {
    // 标识，标识当前访问是用户管理页面
    req.app.locals.currentLink = 'user';
    // 接收客户端传递过来的当前页参数
    let page = req.query.page || 1;
    // 当前页显示的数据条数
    let pagesize = 10;
    // 查询用户的数量
    let count = await User.countDocuments({});
    // 总页数
    let total = Math.ceil(count / pagesize);
    // 页码对应的数据查询开始位置   = (第几页 -1 )*每页显示的总数据条数
    let start = (page - 1) * pagesize;
    // return;
    // 将用户信息从数据库中查找出来
    let users = await User.find({}).limit(pagesize).skip(start);
    res.render('admin/user.art', {
        users: users,
        page:page,
        total:total
    });
}