function Promise(executor) {
    //添加内置属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    // this.callback={}; 
    this.callbacks = [];  //需要来保存多个回调函数
    let _this = this;


    function resolve(data) {
        //判断状态，来确保只能从pending更改至fulfilled或rejected
        if (_this.PromiseState != 'pending') return;
        //1.修改对象的状态（promiseState）
        _this.PromiseState = 'fulfilled';  //这里的this指向的是调用者
        //2.设置对象的结果值（promiseResult）
        _this.PromiseResult = data;

        // if (_this.callback.onResolved) {
        //     _this.callback.onResolved(data);
        //     //或者_this.callback.onResolved(_this.PromiseResult);
        // }
        _this.callbacks.forEach(item => {
            item.onResolved(data);
        })
        //item是当前forEach方法正在处理的元素
    }
    function reject(data) {
        if (_this.PromiseState != 'pending') return;
        _this.PromiseState = 'reject';
        _this.PromiseResult = data;
        // if (_this.callback.onRejected) {
        //     _this.callback.onRejected(data);
        //     //或者_this.callback.onRejected(_this.PromiseResult);
        // }
        _this.callbacks.forEach(item => {
            item.onRejected(data);
        })
    }

    //throw‘error’ 来改变promise状态
    try {
        //同步调用执行器函数
        executor(resolve, reject);   //executor同步调用的时候 相当于  resolve();  调用者为window
    } catch (e) {
        reject(e);
    }
}

Promise.prototype.then = function (onResolved, onRejected) {
    const _this = this;
    //判断回调函数参数，因为在实现异常穿透的时候，可以允许不传onRejected
    if(typeof onRejected !== 'function'){
        onRejected = reason =>{
            throw reason;
        }
    }
    //如果不传onResolved，也需要实现值传递，就补上一个return value这个then产生的promise的状态为resolve
    if(typeof onResolved !== 'function'){
        onResolved = value => value;
        //箭头函数的简写形式 (value) => {return value}
    }
    return new Promise((resolve, reject) => {
        //封装函数来判断p.then内返回的result为promise或者其它
        function callback(type){
            try {
                let result = type(_this.PromiseResult);
                if (result instanceof Promise) {
                    //如果是promise对象
                    result.then(v => {
                        resolve(v);
                    }, r => {
                        reject(r);
                    })
                } else {
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        }
        //调用回调函数
        if (this.PromiseState === 'fulfilled') {
            callback(onResolved);
        }
        if (this.PromiseState === 'rejected') {
            callback(onRejected);
        }
        //判断为 pending 来应对异步任务的情况
        if (this.PromiseState === 'pending') {
            //因为回调函数的执行是在状态改变之后，不在then里面而是在resolve或者reject中执行
            //因此我们需要保存回调函数
            // 这种方法存在欠缺，因为遇到多个回调函数的时候只会执行最后一个。
            // this.callback = {
            //     onResolved:onResolved,
            //     onRejected:onRejected
            // }
            this.callbacks.push({
                onResolved: function () {
                    callback(onResolved);
                },
                onRejected: function () {
                    callback(onRejected);
                }
            });
        }

    })
}
//then方法的返回的是一个新的promise

Promise.prototype.catch = function(OnRejected){
    return this.then(undefined,onRejected);
}

//Promise.resolve属于函数对象而不是实例对象，上面那两个方法需要实例化之后才能使用
//传入的value如果是成功的promise则原来的promise也为成功
Promise.resolve = function(value){
    return new Promise((resolve,reject)=>{
        if(value instanceof Promise){
            value.then(v=>{
                resolve(v);
            },r=>{
                reject(r);
            })
        }else{
            resolve(value);
        }
    });
}

Promise.reject = function(reason){
    return new Promise((resolve,reject)=>{
        reject(reason);
    });
}

Promise.all = function(promises){
    return new Promise((resolve,rejetc)=>{
        let count = 0;
        let arr = [];
        // promises.forEach((item)=>{
        //     item.then(v=>{
        //         count++
        //         arr.push(v);  //单这种方法会有缺陷还需要加个顺序变量（因为每个promise执行时间有快慢）
        //         if(count === promises.length){
        //             resolve(arr);
        //         }
        //     },r=>{
        //         this.reject(r);
        //     })
        // })
        for(let i = 0;i < promises.length ; i++){
            promises[i].then(v=>{
                count ++;
                arr[i] = v;
                if(count === promises.length){
                    resolve(arr);
                }
            },r=>{
                reject(r);
            });
        }
    });
}

