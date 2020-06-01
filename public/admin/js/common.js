function serializeToJson(form){
    var result = {};
    // 获取表单中用户输入的内容
    // [{name:'email',value:'用户输入的内容'}]

    // 把返回的数组数据转换成下面的这个对象的格式
    // {email:'zhangsan@itcast.cn',password:'123456'}
    var f = form.serializeArray();
    f.forEach(function(item){
        // result[item.name]相当于result.email,item.value相当于当前循环项value的内容
        result[item.name] = item.value
    });
    return result;
}