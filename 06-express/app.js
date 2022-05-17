//1.引入express
const express = require('express');

//2.创建应用对象
const app = express();

//3.定义端口
const port = 8000;

//4.创建路由规则
app.get('/server', (req, res) => {
    //设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('hello,world')
});

//4.创建路由规则
app.post('/server', (req, res) => {
    //设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    //响应头，用来接受自定义的头信息
    //res.setHeader('Access-Control-Allow-Headers','*');
    res.send('hello,world post')
});

//app.all() 可以接受任意请求
app.all('/axios-server', (req, res) => {
    //设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    //响应头，用来接受自定义的头信息
    res.setHeader('Access-Control-Allow-Headers','*');
    const data = {
        name:"bitter-gourd",
        age:"18"
    };
    //对对象进行字符串转换
    let str = JSON.stringify(data);
    res.send(str);
});

app.all('/fetch-server', (req, res) => {
    //设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    //响应头，用来接受自定义的头信息
    res.setHeader('Access-Control-Allow-Headers','*');
    const data = {
        name:"bitter-gourd",
        age:"18"
    };
    //对对象进行字符串转换
    let str = JSON.stringify(data);
    res.send(str);
});


app.get('/delay', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(()=>{
        res.send('延时响应')
    },3000);
});


app.all('/check-username', (req, res) => {
    //设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    //响应头，用来接受自定义的头信息
    res.setHeader('Access-Control-Allow-Headers','*');
    const data = {
        exist:1,
        msg:'用户名已经存在'
    };
    //对对象进行字符串转换
    let str = JSON.stringify(data);
    res.end('handle(${str})');
});

//5.监听段口启动服务
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})