## Web API

#### API

API(应用程序编程接口)是一些预先定义的函数，目的是提供应用程序与开发人员基于某软件或者硬件得以访问一组例程的能力，而又无需访问源码，或理解内部工作机制的细节。

简单理解：API是一种工具，以便我们更轻松的实现想要完成的功能。

#### Web API

BOM和DOM

#### 获取元素

1. 因为我们文档页面从上往下加载，所以先得有标签，script得写在标签下面。

2. `getElementById`返回的是一个元素对象。

3. `console.dir`打印对象可以更好的查看里面的属性和方法。
4. `getElementsByTagName`方法可以返回带有指定标签名的对象的**集合**。（伪数组）
5. `element.getElenmentsByTagName`可以获得这个元素里面的某些标签。
6. `getElementsByClassName`根据类名获得元素对象**集合**。
7. `querySelector`返回指定选择器的第一个元素对象。
8. `querySelectorAll`返回指定选择器的所有元素对象**集合**。
9. `document.body`获得body标签。
10. `document.documentElement`获得html元素对象。

#### 事件基础

事件由三部分组成：事件源，事件类型，事件处理程序。

#### `innerText`和`innerHTML`的区别

`innerHTML`可以识别HTML标签。（多用HTML）

注意点：这两个方法是可以读写的，可以获取元素里面的内容。

#### 操作元素

可以修改元素属性

```javascript
<button id="ldh">刘德华</button>
<button id="zxy">张学友</button>
<img src="images/ldh.jpg" alt="">

var ldh = document.getElementById('ldh');
var zxy = document.getElementById('zxy');
var img = document.querySelector('img');
zxy.onclick = function(){
	img.src = 'imgages/zxy.jpg';
    img.title = '张学友';
}
ldh.onclick = function(){
	img.src = 'images/ldh.hpg'；
    img.title = '刘德华';  
}
//title属性是鼠标经过时显示的文字。
```

#### 操作元素之表单元素设置

表单里面的值（文字内容）是通过value来修改的。

`.innerHTML`是普通盒子如div改变内容使用的。

#### 登录注册时密码显示处理

```javascript
<img src='images/eye.png' alt='' id='eye'>
<input type='password' id='pwd'>

var eye = document.getElementById('eye');
var pwd = document.getElementById('pwd');
var flag = 0;
eye.onclick = function(){
	if(flag == 0){
        pwd.type = 'text';
        flag = 1;
    }else {
        pwd.type = 'password';
        flag = 0;
    }
}
```

#### 操作元素之样式属性操作

1. JS里面的样式采用的是驼峰命名法，比如fontSize、backgroundColor

2. JS修改style样式操作，产生的是行内样式，权重比较高。 
3. 更好的做法其实是封装一个className，在JS操作时直接修改类名。

```
var div = document.querySelector('div');
div.onclick = function(){
	this.style.backgroudColor = 'pueple';
	this.style.width = '250px';
}
```

#### 显示隐藏文本框

```javascript
var text = document.querySelector('input');
text.onfocus = function(){
	if(this.value === '手机'){
		this.value = '';
	}
}
text.onblur = function(){
	if(this.value === ''){
		this.value ='手机';
	}
}
```

#### 自定义属性操作

自定义属性，就是开发者自己添加的属性。

1. 获取元素的属性值

`getAttribute('属性')`  

```javascript
var div = document.querySelector('div');
console.log(div.id);

console.log(div.getAttribute('id'));
```

2. 设置属性值

`element.setAttribute('属性','值')`

3. H5自定义属性

H5规定自定义属性`data-`开头作为属性名并且赋值。

`element.dataset.index`H5新增的更改自定义属性的方法。

#### 利用节点关系来进行节点操作

`parentNode`父节点，得到最近的父级节点。

`childNodes`子节点，得到所有的子节点，包括元素节点和文本节点（包括换行）。

如果只想获得里面的元素节点，需要专门处理，因此一般不提倡使用childNodes。

`children`获取所有的子元素节点，实际开发常用。

`firstChild`  `lastChild`针对特定位置的子节点，但是包括元素节点和文本节点。

`firstElementChild`针对特定位置的子节点，只获取元素节点，但是存在兼容性问题。

`nextSibling`下一个兄弟节点，包含元素节点或者文本节点。

`previousSibling`上一个兄弟节点，包含元素节点或者文本节点。

`nextElementSibling`下一个兄弟元素节点，但是存在兼容性问题。

`previousElementSibling`上一个兄弟元素节点，但是存在兼容性问题。

```javascript
var ol = document,querySelector('ol');  //会以伪数组的形式存储子节点
console.log(ol.children[0]);   //第一个子节点
console.log(ol.children[ol.children.length - 1]);  //最后一个节点
```

**如何解决兄弟元素节点的兼容性问题？**

封装一个兼容性函数。

```javascript
function getNextElementSibling(element){
	var el = element;
	while(el = el.nextSiling){
		if(el.nodeType === 1){
			return el;
		}
	}
	return null;
}
```

#### 下拉菜单

```javascript
var nav = document.querySelector('.nav');
var lis = nav.children;
for(var i = 0;i < lis.length;i++){
	lis[i].onmouseover = function(){
		this.children[1].style.display = 'block';
	}
	lis[i].onmouseout = function(){
		this.children[1].style.displat = 'none';
	}
}
```

#### 创建节点和添加节点

```javascript
var li = document.createElement('li');
var ul = document.querySelector('ul');
ul.appendChild(li);

//添加节点（在前面）node.insertBefore(child,指定元素)
var lili = document.createElement('li');
ul.insertBefore(lili,ul.children[0]);
```

#### 发布留言案例(补充删除)

```javascript
var btn = document.querySelector('button');
var text = document.querySelector('textarea');
var ul = document.querySelector('ul');
btn.onclick = function(){
	if(text.value === ''){
		alert('您没有输入内容');
	} else {
		var li = document.createElement('li');
		li.innerHTML = text.value + "<a href='javascript:;'>删除</a>";
		ul.appendChild(li);
        var as = document.querySelectorAll('a');
        for(var i = 0;i < as.length;i++){
            as[i].onclick = function(){
                ul.removeChild(this.parentNode);
            }
        }
	}
}
```

#### 删除节点

`node.removeChild(child)`

#### 克隆节点

`node.cloneNode()`

1. 如果括号参数为空或者false，只复制标签不复制内容。
2. 括号为true，复制标签复制标签里面的内容（包含子节点）。

#### 三种创建元素的区别

`document.write()`

`element.innerHTML`

```javascript
ul.innerHTML += '<a href="#">链接</a>’  //效率不高
var arr[];
for(var i = 0;i <= 100;i++){
    arr.push('<a href="#">链接</a>’);
}
ul.innerHTML = arr.join('');
```

`document.createElement()`

1. `document.write()`会直接将内容写入页面的文档流，但是文档流执行完毕后再执行（比如给button绑定事件，后续执行时；或者window.onload绑定事件），它会重置整个页面，覆盖直接写过的全部东西。
2. `innerHTML`是将内容写入某个DOM节点，不会导致页面全部重绘。
3. `innerHTML`穿件多个元素的效率更高，前提是不要拼接字符串要用数组，结构稍微复杂。
4. `document.createElement()`创建多个元素效率稍低，但结构清晰。

#### 注册事件的两种方式

**传统注册方式**

1. 利用on开头的实现onclick
2. 注册事件的唯一性
3. 同一个元素同一个事件只能设置一个处理函数，最后注册的处理函数将会覆盖前面注册的处理函数。

**方法监听注册方式**

`addEventListener()`

特点：同一个元素同一个事件可以注册多个监听器。

按注册顺序依次执行。

```javascript
eventTarget.addEventListener(type,listener[,useCapture])
eventTarget.addEventListener()方法将指定的监听器注册到eventTarget(目标对象)上，当该对象触发指定的事件时，就会执行事件处理函数。
三个参数：
type：事件类型字符串，如click、mouseover，不带on
listener：事件处理函数，事件发生时，会调用该监听函数
useCapture：可选参数，是一个布尔值，默认是false。

btn.addEventListener('click',function(){
	alert(111);
})
btn.addEventListener('click',function(){
	alert(222);
})
//先弹出111再弹出222
```

IE9之前用`attachEvent`替代`addEventListener()`

**删除事件**

```javascript
传统方式：
var divs = document.querySeletorAll('div');
divs[0].oncilck = function(){
	alert(111);
	divs[0].onclick = null;  //在点完一次后解绑
}
方式监听注册方式：
divs[1].addEventListener('click',fn)   //里面的fn不需要加调动小括号
function fn(){
    alert(222);
    divs[1].removeEventListener('click',fn);
}
```

#### DOM事件流

事件流描述的是从页面中接收事件的顺序。

事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程即DOM事件流。

![alt DOM](https://github.com/gaoachao/FE-learning/raw/main/Screenshots/1.png)

