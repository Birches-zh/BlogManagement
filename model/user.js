const mongoose = require('mongoose');
// 导入bcrypt
const bcrypt = require('bcrypt');
const Joi = require('joi');
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,//保证邮箱地址不重复
    },
    password: {
        type: String,
        required: true
    },
    role: {
        // 管理员设置
        // admin 超级管理员
        // normal 普通用户
        type: String,
        required: true
    },
    state: {
        //登录状态
        // 0表示启用
        // 1表示禁用
        type: Number,
        default: 0
    }
})
// 创建集合
const User = mongoose.model('User', userSchema);

async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'iteheima',
        email: 'itheima@itcast.cn',
        password: pass,
        role: 'admin',
        state: 0
    });
}
// createUser();
function validateUser(result) {
    // 定义规则对象
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,16}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    }
    return Joi.validate(result, schema);
}


// 将用户集合做为模块成员进行导出
module.exports = {
    User: User,
    validateUser:validateUser
}