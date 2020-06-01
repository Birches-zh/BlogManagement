// 引入joi模块
const Joi = require('joi');
// 定义对象的验证规则
const schema = {
    username:Joi.string().min(2).max(5).required().error(new Error('username属性没有通过验证')),
    birth:Joi.number().min(1900).max(2020).error(new Error('birth没有通过验证'))
};
// 实施验证


async function run (){
    try{
     await Joi.validate({username:'ab',birth:1800},schema);
    }catch(ex){
        console.log(ex.message);
        return;
    }
    console.log('验证通过')
}
run();