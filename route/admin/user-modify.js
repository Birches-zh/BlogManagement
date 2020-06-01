const bcrypt = require('bcrypt');
const { User } = require('../../model/user.js');
module.exports = async (req, res,next) => {
    // 即将要修改用户的id值
    let id = req.query.id;
    // 即将要修改的用户id
    let { username,email,role,state,password } = req.body;

    let user = await User.findOne({ _id: id });

    // 匹配密码
    const isValidate = await bcrypt.compare(password,user.password);
    if(isValidate){
    // 密码匹配成功
    // 修改数据库的文档
        await User.updateOne({_id:id},{
            username:username,
            email:email,
            role:role,
            state:state
        })
        // 修改完重定向
        res.redirect('/admin/user')
    }else{
    // 密码匹配失败
    let obj = {path:'/admin/user-edit',message:'密码输入错误，请重新输入',id:id}
    next(JSON.stringify(obj));
    }
}