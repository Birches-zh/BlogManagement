// 引入joi模块

const { User,validateUser } = require('../../model/user.js');
const bcrypt = require('bcrypt');
module.exports = async (req, res,next) => { 

    //实施验证
    try {//因为是异步函数，捕获异常要用到try catch
        // 验证通过了会绕过catch，执行catch后面的代码块
        await validateUser(req.body);
    } catch (err) {
        //如果验证没有通过
        //重定向到用户添加页面
        //重定向会偷偷执行res.end，如果不加return 后面的代码执行res.send会报错
        // return res.redirect(`/admin/user-edit?message=${err.message}`)
        return next(JSON.stringify({path:'/admin/user-edit',message:err.message}))
    }
    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({email:req.body.email})
    // 如果邮箱已经存在就证明被占用了
    if(user){
        //重定向会偷偷执行res.end，如果不加return 后面的代码执行res.send会报错
        // return res.redirect(`/admin/user-edit?message=`)
        return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱地址已被占用'}));
    }
    // 对密码进行加密处理
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password,salt);
    req.body.password=password;
    await User.create(req.body);
    // 将页面重定向到用户页面当中
    res.redirect('/admin/user')
}