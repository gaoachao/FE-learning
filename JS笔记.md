##  JS-advanced

#### 原型链

1.只要是对象就有`__proto__`原型，指向原型对象。

2.我们构造函数创建的原型对象里面的`__proto__`原型指向的是`Object.prototype`

3.`Object.prototype`原型对象里面的`__proto__`原型指向的为` null`

#### 原型链成员查找原则

1.当访问一个对象的属性（包括方法）时，首先查找这个对象自身有没有该属性。

2.如果没有就查找它的原型（也就是`__proto__`指向的`prototype`原型对象）。

3.如果还没有就找原型对象的原型（Obeject的原型对象）。

4.依次类推一直找到Object为止（null）。

5.proto对象原型的意义就在于为对象成员查找机制提供一个方向，或者说一条线路。

6.在查找过程中，采取“就近原则”，比如该对象自身存在该属性时就不再去查找它的原型。

#### 原型对象中this指向

```javascript
function Star(uname,age){
   this.uname = uname;
   this.age = age;
}
var that;
Star.prototype.sing = function(){
    console.log('我会唱歌');
    that = this; 
}
var ldh = new Star('刘德华'，38);
ldh.sing();
console.log(that === ldh);   //true
```

1.在构造函数中，里面的this指向实例对象。

2.在原型对象函数里面的this指向的是实例对象。

#### 利用原型对象扩展内置对象方法

```javascript
console.log(Array.prototype);
Array.prototype.sum = function(){
   var sum = 0;
   for(var i = 0;i < this.length;i++{
      sum += this[i];
   }
}
var arr = [1,2,3];
console.log(arr.sum());  //6
```

#### call()方法

1.`call()`可以调用函数

2.`call()`可以改变这个函数的`this`指向且传递参数

```javascript
fun.call(thisArg,arg1,arg2,...)
this.Arg：当前调用函数this的指向对象
arg1,arg2：传递的其他参数


function fn(x,y){
    console.log('我想喝手磨咖啡')；
    console.log(this)；
    console.log(x+y)
}
var object1{
    name:'andy'
};
//1.call()可以调用函数
fn.call();
//2.call()可以改变这个函数的this指向且传递参数
fn.call(object1);  //此时fn()的this指向就更改成为object1
fn.call(object1,1,2);  //输出3

```

#### 组合继承

子构造函数继承父构造函数的属性和方法

```javascript
function Father(uname,age){
   this.uname = uname;
   this.age = age;
}
Father.prototype.money = function(){
   console.log(10000);
}
function Son(uname,age){
   Father.call(this,uname,age); //此处的this是Son中的this，this指向的是Son这个对象
   //call的作用是把父构造函数中的this修改为自构造函数中的this
}
//Son.prototype = Father.prototype;  这样赋值是错误的，如果修改子原型对象，父原型对象也会修改
Son.prototype = new Father();   //实例化一个对象，让Son的原型函数拿到父构造函数的方法同时又不会使改变子构造函数的时候改变父构造函数。
Son.prototype.constructor = Son ;
//如果利用对象的形式修改了原型对象，别忘了利用constructor指回原来的构造函数
```

#### 类的本质

ES6 之前通过 构造函数+原型 实现面向对象编程。

ES6 之后通过 类 实现面向对象编程。

1.类的本质是一个函数。我们可以简单的认为 类 就是构造函数的另一种写法。

复习构造函数的特点：

（1）构造函数有原型对象`prototype`

（2）构造函数原型对象`prototype`里面有`constructor`方法指向构造函数本身

（3）构造函数可以通过原型对象添加方法

（4）构造函数创建的实例对象有`__proto__`原型指向构造函数的原型对象

类的特点：

（1）类有原型对象`prototype`

（2）类原型对象`prototype`里面有`constructor`方法指向类本身

（3）类可以通过原型对象添加方法

（4）类创建的实例对象有`__proto__`原型指向类的原型对象

2.ES6的类的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更清晰。（语法糖）

#### ES5中的新增的方法（数组方法）

迭代方法：forEach(),map(),filter(),some(),every();

**遍历数组**

```javascript
array.forEach(function(currentValue,index,arr)) 
currentValue:数组当前的值
index:数组当前的索引
arr:数组对象本身

var arr = [1,2,3]
var sum = 0;
arr.forEach(function(value,index,array){
   console.log('每个数组元素' + value);
   console.log('每个数组元素的索引号' + index)；
   console.log('数组本身' + arr)； // 1,2,3
   sum += value; //6
})
```

**筛选数组**

```javascript
array.filter(function(value,index,array))
return 一个数组

var arr = [12,66,4,88];
var newArr = arr.filter(function(value,index,array){
     return  value >= 20; 
});
console.log(newArr);   //[66,88]

```

**查找数组中满足条件的元素**

```javascript
array.some(function(currentValue,index,arr))
return 布尔值，如果查找到这个元素就返回true，查找不到就返回false
如果找到第一个满足条件的元素，则终止循环，不在继续查找。
var arr = [10,30,4];
var flag = arr.some(function(value){
    return value >= 20;
});
console.log(flag);  //true
var arr1 = ['red','pink','blue'];
var flag1 = arr1.some(function(value){
    return value == 'pink';
});
console.log(flag1);  //true
```

**`forEach`和`some`的区别**

在`forEach`内遇到return true不会终止遍历，在`some`中会终止遍历。

`fliter`中也遇到retuen true也不会终止遍历。

#### ES5中的新增的方法（字符串方法）

**trim方法去掉字符串两侧空格**（不会去掉中间的空格）

```javascript
var str = '  andy  ';
console.log(str);
var str1 = str.trim();
console.log(str1);

var input = document.querySelector('input');
var btn = document.querySelector('button');
var div =document.querySelector('div');
btn.onclick = function(){
	if(input.value.trim() === ''){
        alert('请输入内容')；
    } else {
        console.log(input.value.trim());
        console.log(input.value.trim().length);
        div.innerHTML = input.value.trim();
    }
}
//这么写的好处在于让用户在输入内容的时候避免多输入的空格的影响。
```

#### ES5中的新增的方法（对象方法）

**`Object.defineProperty()`**

Object.defineProperty(obj,prop,descriptor)
obj:必需。目标对象
prop：必需。需定义或修改的属性的名字。
descriptor：必需。目标属性所拥有的特性。

descriptor说明：
1.以对象形式{}书写
2.可选值：

- value，修改或者添加属性值。
- writable，可选值为true和false。来确实属性值是否可以修改。
- enumerable，可选值true和false。来确定属性值是否可以枚举。
- configuration，可选值为true和false。来确定目标属性是否可以被删除或者再次修改特性。

```javascript
var obj = {
    id: 1,
    pname: '小米'，
    price：1999
}；
Object.defineProperty(obj,num,{
    value:1000;
});
Object.defineProperty(obj,address,{
    value:'浙江绍兴'，
    writable:false，
    enumerable:false,   //默认值为false
    configurable:false
});
delete obj.adress;   //这是无效的 因为configurable为false
console.log(obj);    //仍然存在adress属性
Object.defineProperty(obj,address,{
    writable:true    //这也是无效的，因为configurable为false，同时不允许更改第三个属性的设定
});
```

**`Object.keys()`**

用于获取对象自身所有的属性值

```javascript
var obj = {
  id:1,
  pname:'小米',
  price:1999,
  num:2000
};
var arr = Object.keys(obj);
//可以直接把属性名放进一个数组内
arr.forEach(function(value){
    console.log(value);
});
```

#### **函数的定义方式和调用方式**

所有的函数都是Function的实例（对象），函数也属于对象。

**函数的调用方式和this的指向**

1.普通函数    this指向是window

```javascript
function fn(){
  console.log('hello,world');
};
fn();   //等于 window.fn();
```

2.对象的方式   this指向的是o

```javascript
var o = {
  sayHi:function(){
     console.log('hello,world');
  }
}
o.sayHi();
```

3.构造函数  this指向的是ldh实例对象，原型对象里面的this指向的也是ldh实例对象

```javascript
function Star(){};
Star.prototype.sing = function(){};
var ldh = new Star();
```

4.绑定事件函数  this指向btn

```javascript
btn.onclick = function(){};
```

5.定时器函数   this指向window

```javascript
setInterval(function(){},1000);
//等价于 window.setInterbal
```

6.立即执行函数  this指向window

```javascript
(function(){
	console.log('hello,world');
})();
```

**改变函数内部this指向的三种方法**

1. call() 可以调用函数以及改变函数内部的this指向

```javascript
var o = {
  name:'andy'
}
function fn(a,b){
  console.log(this);
  console.log(a + b);
}
fn.call(o,1,2);  // {o:name}  3
function Father(uname,age,sex){
    this.name = uname;
    this.age = age;
    this.sex =sex;
}
function Son(uname,age,sex){
    Father.call(this,uname,age,sex);  //Father的this指向Son的this
}
var son = new Son('刘德华'，38，‘男’);
```

2. apply()  可以调用函数也可以改变函数内部的this指向，但它的参数必须是数组（伪数组）

```java
function fn(arr) {
   console.log(this);
   console.log(arr);
};
fn.apply(o,['pink']);
//apply的主要运用，比如我们可以利用apply借助于数学内置对象求最大值
var arr=[1,66,3,99,4];
var max = Math.max.apply(Math,arr);   //直接运用apply来求出最大值，this从Math指向Math（不变）
//先调用Math这个对象在把arr传给max这个方法
```

3. bind()方法   不会调用函数，但可以改变函数内部this指向，同时也能传参。

```javascript
var o = {
  name:'andy'
}
function fn() {
   console.log(this);
};
fn.bind(o);    //返回的是原函数改变this后的新函数
var f = fn.bind(o);
```

bind()的运用：对于一个按钮，我们在点击后就禁用这个按钮，3秒后开启这个按钮。

```javascript
var btn = document.querySelector('button');
btn.onclick = function(){
	this.disabled = true;
	setTimeout(function(){
	    this.disabled = false;   //setTimeout的函数中的this指向的是window因此无法解除
	}.bind(this),3000)    //但在function外加个bind(this)后就可以了，bind内的this是外层的
};
```

**call apply bind 总结**

1. call经常做继承。
2. apply经常跟数组有关系，比如借助于数学对象实现数组的最大值和最小值。
3. bind不调用函数，但是还想改变this指向，比如改变定时器内部的this指向。

#### 严格模式

严格模式在IE10以上版本的浏览器中才会被支持，就版本的浏览器会被忽略。

严格模式对正常的javascript语义做了一些更改:

1.消除了javascript语法的一些不合理、不严谨之处，减少了一些怪异行为。

2.消除代码的一些不安全之处，保证代码运行的安全。

3.提高编译器效率，增加运行速度。

4.禁用了在ECMAScript的未来版本中可能会定义的一些语法，为未来新版本的javascript做好铺垫。

整个script标签开启严格模式：

```javascript
<script>
'use strict';
</script>

<script>
	(function(){
		'use strict';
	})();
</script>
```

为某个函数开启严格模式：

```javascript
<script>
	function fn(){
		'use strict';
	}
</script>
```

**严格模式的变化：**

1. 严格模式下必须先声明再使用。
2. 在严格模式下不能随意删除已经定义好的变量。
3. 严格模式下，全局作用域中函数中的this指向是undefined。（不再是window）
4. 非严格模式下,如果构造函数不使用new调用，this会报错，原因为第3点。
5. 在严格模式下，setTimeout()定时器中this指向的还是window。
6. 事件、对象还是指向调用者。
7. 解决函数参数重复的问题。
8. 不允许在非函数的代码块内声明函数。

```javascript
function Star(){
  this.sex = '男';
}
Star();
console.log(window.sex);   //男

‘use strict’;
function Star(){
  this.sex = '男';
}
Star();
```

```javascrpt
function fn(a,a){
	console.log(a+a);
};
fn(1,2);  //4

'use strict';
function fn(a,a){
	console.log(a+a);
};
fn(1,2); //报错
```

#### 高阶函数

高阶函数是对其他函数进行操作的函数，它接受函数作为参数或讲函数作为返回值输出。

```
function fn(a,b,callback){
	console.log(a+b);
	callback && callback();
}
fn(1,2,function(){
	console.log('我是最后调用的')；
});
```

#### 闭包（closure）

闭包是指有权访问另一个函数作用域种变量的函数。闭包是一种函数。

变量根据作用域不同分为两种：全局变量和局部变量。

闭包：fun()访问了外部作用域中的局部变量，可称fun()为闭包，闭包也可以说是一种现象。

闭包的主要作用：延伸了变量的作用范围。

```javascript
function fn(){
	var num = 10;
	function fun(){
		console.log(num);
	}
    fun();
}

function fn(){
	var num = 10;
	function fun(){
		console.log(num);
	}
    return fun;
}
var f = fn();
f();    //10   在fn()外部的全局作用域 访问了fn()局部作用域的局部变量  产生闭包。
```

#### 闭包的应用——点击li打印当前索引号

```javascript
onclick异步，如果直接onclick后console.log(i),会输出lis.length+1
1.动态添加属性的方式
var lis = document.querySelector('.nav').querySelectorAll('li');
for(var i = 0;i <lis.length;i++){
	lis[i].index = i;
	lis[i].onclick = function(){
		console.log(this.index);
	}
}
2.利用闭包的方式得到当前的li的索引号
for(var i = 0;i < lis.length;i++){
	(function(i){
		  lis[i].onclick = function(){
		  console.log(i);   //此处的函数的i用到了立即执行函数内部作用域的变量，产生闭包。
	  }
	})(i);
}
```

#### 闭包的应用——3秒后打印li的内容

```javascript
var lis = document.querySelector('.nav').querySelectorAll('li');
for(var i = 0;i < lis.length;i++){
	(function(i){
		setTimeout(function(){
			console.log(li[i].innerHTML); //此处的i用到了立即执行函数内部作用域的变量，产生闭包
		},3000)
	})(i);
}
```

#### 闭包的应用——计算打车价钱

```javascript
var car = (function(){
	var start = 13;   //局部变量
	var total = 0;    //局部变量
	return {
		price:function(n){
			if(n<=3){
				total = start;
			} else {
				total = start + (n - 3) * 5;
		    }
		    return total;
		},
		yd:function(flag){
			return flag ? total + 10:total;
		}
	}
})();
```

#### 浅拷贝和深拷贝

浅拷贝只是拷贝一层，更深层次对象级别的只拷贝引用。

```javascript
var obj = {
	id:1,
	name:'andy'
	msg:{
		age:18
	}
};
var o = {};
for(var k in obj){
	//k是属性名  obj[k]是属性值
	o[k] = obj[k];
}
o.msg.age = 19;  //这样会影响o中msg.age的值。（因为修改的是地址）

//浅拷贝如果存在对象级别的数据，如obj内部只会拷贝msg地址，会产生一个问题：如果修改拷贝后得到的o对象的数据也会影响obj，因此拷贝过去的是地址，在obj内部的msg指向和o内部的msg指向同一片内存。

ES6中的浅拷贝方法Object.assign();
Object.assign(o,obj)；  //把obj拷贝给o
```

深拷贝拷贝多层，每一级别的数据都会拷贝。

深拷贝做了一件事情，把obj内部的对象数据如msg复制一份，产生两个地址，让obj指向新产生的地址。

注意点：Array 也属于 Object 所以必须把Array放在Object上面。

实现方式：递归。

```javascript
var o = {};
function deepCopy(newobj,oldobj){
    for(var k in oldobj){
        //判断我们的属性值属于哪种数据类型
        //1.获取属性值  oldobj[k]
        var item = oldobj[k];
        //2.判断这个值是否为数组
        //3.判断这个值是否为对象
        //4.属于是简单数据类型
        if(item instanceof Array){
            newobj[k] = [];
            deepCopy(newobj[k],item)
        }else if (item instanceof Object){
            newobj[k] = {};
            deepCopy(newobj[k],item);
        } else {
            newobj[k]=item;
        }
    }
}
deepCopy(o,obj);
```

#### 正则表达式

定义：正则表达式是用于匹配字符串中字符组合的模式，在JS中，正则表达式也是对象。

作用：正则表达式通常用来检索、替换那些符合某个模式（规则）的文本，例如验证表单：用户名表单只能输入英文字母、数字和下划线，昵称输入框中可以输入中文（匹配）。此外，正则表达式还常用于过滤页面内容中的一些敏感词（替换），或从字符串中获取我们想要的特性部分（提取）。

```javascript
1.利用RegExp对象来创建正则表达式
var regexp = new RegExp(/123/);
2.利用字面量创建正则表达式
var rg = /123/;
console.log(rg.test(123));  //true
console.log(rg.test('abc'));  //true
```

**测试正则表达式test**

test()正则对象方法，用于检测字符串是否符合该规则，返回值为true或false，其参数为测试字符串。

```
regexObj.test(str)
regexObj是要写的正则表达式
str是我们要检测的文本
```

**一些常见的正则表达式**

在正则表达式内不需要加引号

边界符 ^$

量词符 *+?{}

```javascript
/abc/     只要包含abc这个字符返回的都是true
/^abc/    必须是abc开头的字符串
/abc$/    必须是abc结尾的字符串
/[abc]/   只要包含有a,b,c都返回true
/^[abc]$/ 只有是a,b,c三个字符中的一个才返回true  aa也是false
/^[a-z]$/ 只要是a-z中的任何一个字母就返回true  -表示范围符
/^[a-zA-Z0-9_-]$/  表示可以输入26个字母的大小写、数字、下划线、短横线
/^[^a-zA-Z0-9_-]$/ 在方括号内加入^表示取反，表示不能输入26个字母的大小写、数字、下划线、短横线
/^a{3,6}$/ 表示出现3到6次的a
/^[a-zA-Z0-9_-]{6,16}$/  表示可以输入26个字母的大小写、数字、下划线、短横线(6到16位)


* 相当于>=0可以出现0次或者很多次
+ 相当于>=1可以出现1次或者很多次
? 相当于 1 || 0
{3}  相当于重复3次
{3,} 相当于重复3次或者更多次
{3,16} 相当于重复次数大于等于3小于等于16

中括号 字符集合，匹配方括号中的任意字符
大括号 量词符，里面可以表示重复次数
小括号 表示优先级

var reg1 = /^abc{3}$/
var reg2 = /^(abc){3}$/

```

**正则表达式中的替换**

```
/表达式/[switch]
switch:
g:全局匹配
i:忽略大小写
gi:全局匹配+忽略大小写

var text = document.querySelector('texteara');
var btn = document.querySelector('button');
var div = document.querySelector('div');
btn.onclick = function(){
	div.innerHTML = text.value.replace(/激情|gay/g,'**'); //完成敏感词的替换。
}
```

#### ES6

ES全称:ECMAScript

ES6实际上是一个泛指，泛指ES2015及后续的版本。

#### let

1. let声明的变量只在所处于的块级有效。（块级作用域）

在一个大括号内使用var关键字声明的变量不具有块级作用域。

```javascript
if(true){
	let a = 10;
    var c = 10;
    console.log(a);  //10
    if(true){
        let b = 10;
    }
    console.log(b);  //b is not defined
}
console.log(a);    //a is not defined
console.log(c);    //10
```

2. let关键字可以防止循环变量变成全局变量

```javascript
for(let i = 0;i < 2;i ++){
}
console.log(i);  //i is not defined
```

3. 不存在变量提升

```
console.log(a);
let a = 10;  
//a is not defined
```

4. 暂时性死区

```
var tmp = 10;
if(true){
	console.log(tmp);
	let tmp = 20;
}
//num is not defined; 因为在大括号内 let关键字又定义了一次变量。
```

#### const

const作用：声明常量，

1. const声明的常量具有块级作用域

```javascript
if(true){
	const a = 10;
	if(true){
		const a = 20;
		console.log(a);  //20
	}
	console.log(a);     //10
}
console.log(a);     //a is not defined
```

2. const声明常量的时候必须赋初始值。
3. 常量赋值后，值不可更改。

复杂数据类型如数组可以更改数据内部的值，但不能更改数据值本身（会改变地址）。

```javascript
const PI = 3.14;
PI = 100;   //assignment to constant variable
const ary = [100,200];
ary[0] = 123;
console.log(ary);  //[123,200]
ary = [1,2];   
console.log(ary);  //assignment to constant variable
```

#### 解构赋值(数组)

ES6中允许从数组中提取值，按照对应位置，对变量赋值。

```javascript
let ary = [1,2,3];
let [a,b,c,d,e] = ary;   
console.log(a);   //1
console.log(b);   //2
console.log(c);   //3
console.log(d);   //undefined
console.log(e);   //undefined
```

#### 解构赋值(对象)

```javascript
let person = {
	name:'zhangsan',
	age:30,
	sex:'男'
}
let {name,age,sex} = person;
let {name:myname,age:myage,sex:maysex} = person;
//:左侧的name、age、sex只是用来进行变量匹配
```

#### 箭头函数

箭头函数是ES6后用来简化函数定义语法的一种函数定义形式

```javascript
const fn = () => {
	console.log(123);
}
fn();
```

1. 函数体中只有一句代码，且代码的执行结构就是返回值，可以省略大括号。

```javascript
function sum(num1,sum2){
    return num1 + num2；
}
const sum = (num1,num2) => num1 + num2;
```

2. 如果形参只有一个，可以省略小括号。

```javascript
const fn = (v) => {alert(v);}
fn(20);

const fn = v =>{alert(v);}
fn(20);
```

#### 箭头函数内的this关键字

箭头函数不绑定this关键字，箭头函数中的this，指向的是函数定义位置的上下文this。

```javascript
function fn(){
	console.log(this);
	return () => {
		console.log(this);
	}
}
const obj = {name:'zhangsan'};
fn.call(obj);
//箭头函数内部的this指向的是 obj，因为箭头函数不绑定this关键字，直接用fn的this而fn的this用call()方法更改为指向obj，故箭头函数的this指向了obj

var age = 100;
var obj = {
    age: 20,
    say:()=>{
        alert(this.age);
    }
}
obj.say();   //alert 100;
//因为obj是不能产生作用域的，调用say的时候，this==window
```

#### 剩余参数

剩余参数语法（三个点）允许我们将一个不定数量的参数表示为一个数组。`(...args)`

```javascript
const sum = (...args) =>{
	let total = 0;
	args.forEach(item => total += item); //forEach()的括号内是箭头函数的略写。
	return total；						//item一个形参省略小括号，return数值省略大括号
};									     
sum(10,20);    //30
sum(10,20,30); //60
```

剩余参数与解构配合使用

```javascript
let ary1 = ['张三','李四','王五'];
let [s1,...s2] = ary1;
console.log(s1);  //张三
console.log(s2);  //['李四','王五']
```

#### 扩展运算符

1. 扩展运算符可以将数组或者对象转为用逗号分隔的参数序列。

```javascript
let ary = [1,2,3];
...ary    //1,2,3
console.log(...ary);   //1 2 3
console.log(1,2,3);    //1 2 3
```

2. 扩展运算符可以应用于合并数组

```javascript
let ary1 = [1,2,3];
let ary2 = [4,5,6];
let ary3 = [...ary1,ary2];
console.log(ary3);  // [1,2,3,4,5,6]

ary1.push(...ary2);
console.log(ary1);   //[1,2,3,4,5,6]
```

3. 扩展运算符可以将伪数组或可遍历对象转换为真正的数组

```javascript
let oDivs = document.getElenmentsByTagName('div');
console.log(oDivs);   //伪数组
let ary =[...oDivs];  //转换为真正的数组
为什么要这么做？  因为转换为真正的数组后我们就可以用数组方法来处理伪数组
```

#### Array的扩展方法

`Array.from()`将伪数组或可遍历对象转换为真正的数组

该方法还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```javascript
var arrayLike = {
	"0":"张三"，
	"1":"李四"，
	"2":"王五"，
	"length":3
}
var arr = Array.from(arrayLike);
console.log(arr);

var arrayLike2 = {
    "0":"1",
    "1":"2",
    "length":2
}
var ary = Array.from(arrayLike,item => item * 2)
console.log(ary);  //[2,4]
```

`Array.find()`用于找出第一个符合条件的数组成员，如果没有找到就返回undefined

```javascript
let ary = [{
	id:1,
	name:'张三'
},{
	id:2,
	name:'李四'
}]；
let target = ary.find((item,index) => item.id == 2);  //index可以省略
console.log(target); //输id=2的对象
```

`findIndex()`用于找出第一个符合条件的数组成员的位置，如果没有则返回-1

```javascript
let ary = [10,20,50];
let index = ary.findIndex(item => intem > 15);
console.log(index);  //1
```

`includes()`表示某个数组是否包含给定的值，返回布尔值

```
[1,2,3].includes(2);  //true
[1,2,3].includes(4);  //false
```

#### String的扩展方法

ES6新增的创建字符串的方式，使用反引号定义。

模板字符串中可以解析变量。

```javascript
let name = 'zhangsan';
let sayHello = 'my name is ${name}';  //my name is zhangsan
```

模板字符串可以换行

```javascript
let result = {
	name:"zhangsan",
	age:20
};
let html =`
	<div>
		<span>${result.name}</span>
		<span>${result.age}</span>
	</div>
`;
console.log(html);
```

在模板字符串中可以调用函数

```
const sayHello = function(){
	return '我是fn函数'
};
let html = `我是模板字符串 ${fn()} `;
console.log(html);
```

`startsWith()`：表示参数字符串是否在原字符串的头部，返回布尔值。

`endsWith()`：表示参数字符串是否在原字符串的尾部，返回布尔值。

```
let str = 'Hello world !'
str.startWith(hello);  //true
str.endsWith(!);  //true
```

`repeat()`：返回一个字符串，参数是重复的次数

```
console.log("y".repeat(5));
```

#### Set数据结构

ES6提供了新的数据结构Set。类似于数组，但成员的值是唯一的，没有重复的值。

可以利用Set数据结构去重。

```
const s1 = new Set();
console.log(s1.size); //0

const s2 = new Set([1,1,2,2]);
console.log(s2.size);  //2
```

