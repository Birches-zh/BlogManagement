const { User } = require('../../model/user.js');
const bcrypt = require('bcrypt');
module.exports = async (req, res) => {
    // 接收请求参数
    const { email, password } = req.body;
    // 如果用户没有输入邮件地址
    if (email.trim().length == 0 || password.trim().length == 0) {
        //阻止程序向下执行
        return res.status(400).render('admin/error.art', { msg: '邮箱地址或者密码不能为空' });
    }
    // 根据邮箱地址查询用户信息
    // es6中，属性名和属性值的名字一样的话直接写一个就好了
    // 如果查询到了用户user变量值是对象类型，对象中存储的是用户信息
    // 如果没有查询到用户，user变量是为空
    let user = await User.findOne({ email });
    if (user) {
        // 将客户端传递过来的密码和用户信息的密码进行比对
        // bcrypt.compare('明文密码','加密密码'),是一个异步api,用await然后用变量接收
        // true 比对成功
        // false 比对失败
        let isValid = await bcrypt.compare(password,user.password)
        // 如果密码比对成功
        if (isValid) {
            // 登录成功
            // 将用户名存储在请求对象中
            req.session.username = user.username;
            req.session.role = user.role;

            if(user.role == 'normal'){
                res.redirect('/home/index');
            }else{
                res.redirect('/admin/user');
            }
            // 登录成功
            // res.send('登录成功')
            // 重定向
            req.app.locals.userInfo = user; 
        } else {
            res.status(400).render('admin/error.art', { msg: '邮箱地址或密码错误' })
        }
    } else {
        // 没有查询到用户
        res.status(400).render('admin/error.art', { msg: '没有该用户名' })
    }
}
