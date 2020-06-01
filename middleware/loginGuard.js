const guard = (req, res,next) => {
    //判断用户访问是否是登录页面
    //判断用户的登录状态
    // 如果用户是登录的，将请求放行
    // 如果用户不是登录的，将请求到重定向页面
    if(req.url !='/login' && !req.session.username){
        res.redirect('/admin/login');
    }else{
        // 如果用户登录状态是普通用户
        if(req.session.role == 'normal'){
            // 让它跳转到博客首页，阻止程序向下执行
            res.redirect('/home/index');
        }
        // 用户是登录状态，将请求放行
        next();
    }
}

module.exports = guard;