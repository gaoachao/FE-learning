const fs = require('fs');

//回调函数形式
// fs.readFile('./content.txt',(err,data)=>{
// 	if(err) throw err;
// 	console.log(data.toString());
// });

//promise
let p = new Promise((resolve,reject)=>{
    fs.readFile('./content.txt',(err,data)=>{
        if(err) reject(err);
        resolve(data);
    });
});

p.then(value=>{
    console.log(value.toString());
},reason=>{
    console.log(reason);
})