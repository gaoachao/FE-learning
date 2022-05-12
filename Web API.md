# Web API

### API

API(应用程序编程接口)是一些预先定义的函数，目的是提供应用程序与开发人员基于某软件或者硬件得以访问一组例程的能力，而又无需访问源码，或理解内部工作机制的细节。

简单理解：API是一种工具，以便我们更轻松的实现想要完成的功能。

#### Web API

BOM和DOM

### 获取元素

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

### 事件基础

事件由三部分组成：事件源，事件类型，事件处理程序。

### `innerText`和`innerHTML`的区别

`innerHTML`可以识别HTML标签。（多用HTML）

注意点：这两个方法是可以读写的，可以获取元素里面的内容。

### 操作元素

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

### 利用节点关系来进行节点操作

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

### 创建节点和添加节点

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

### 注册事件的两种方式

#### 传统注册方式

1. 利用on开头的实现onclick
2. 注册事件的唯一性
3. 同一个元素同一个事件只能设置一个处理函数，最后注册的处理函数将会覆盖前面注册的处理函数。

#### 方法监听注册方式

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

#### 删除事件

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

### DOM事件流

事件流描述的是从页面中接收事件的顺序。

事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程即DOM事件流。

![alt DOM](https://github.com/gaoachao/FE-learning/raw/main/Screenshots/1.png)

**事件冒泡：**IE最早提出，事件开始时由最具体的元素接收，然后逐级向上传播到DOM最顶层节点的过程。

**事件捕获：**网景最早提出，由DOM最顶层节点开始，然后逐级向下传播到最具体的元素接收的过程。

注意：

1. JS代码只能执行捕获或者冒泡其中的一个阶段。
2. onclick 和 attachEvent 只能得到冒泡阶段。
3. `addEventListener(type,listen[,useCapture])`第三个参数如果是true，表示在事件捕获阶段调用事件处理程序；如果是false（不写的话默认是flase），表示在事件冒泡阶段调用事件处理程序。

```javascript
//冒泡阶段，如果addEventListener第三个参数是 false 或者 省略 那么则处于冒泡阶段
// son -> father -> body ->html -> document
var son = document.querySelector('.son');
son.addEventListener('click',function(){
	alert('son');
},false);   //false可以省略不写
var father = document.querySelector('.father');
son.addEventListener('click',function(){
	alert('father');
},false); 
document.addEventListener('click',function(){
	alert('document');
})
```

4. 有些事件是没有冒泡的，比如`onblur`  `onfocus`   `onmouseenter`  `onmouseleave` 

### 事件对象

```javascript
var div = document.querySelector('div');
div.onclick = function(event){}
div.addEventListener('click',function(e){
    console.log(e);
    // e = e || window.event；
})
```

1. `event`就是一个事件对象 写到我们侦听函数的小括号里面，可以当做形参。
2. 事件对象只有有了事件才会存在，它是系统给我们自动创建的，不需要我们传递参数。
3. 事件对象，是我们事件的一系列相关数据的集合，跟事件有关，鼠标点击、键盘按下等。
4. 事件对象可以由我们自己命名，比如`e`
5. 事件对象也存在兼容性问题，如ie678，用`window.event`可以处理。

#### 事件对象的常见属性和方法：

1. `e.target`返回的是触发事件的对象（元素），`this`返回的是绑定事件的对象（元素）。

```javascript
var div = document.querySelector('div');
div.addEventListener('click',function(e){
	console.log(e.target);  //div
	console.log(this);
});
//如何区别e.target 和 this

var ul = document.quertSelector('ul');
ul.addEventListener('click',function(e){
	console.log(this);
	console.log(e.target);
});
//当你点击li的时候  this指向绑定对象ul  但是e.target指向的是触发对象li（父元素和子元素）

//来处理兼容性问题(ie678中无e.target)
div.onclick = function(e){
	e = e || window.event;
	var target = e.target || e.srcElement;
}
```

2. `e.type`返回事件的类型。
3. `e.preventDefault();`阻止默认行为（事件）。特别地，在ie678中使用returnValue属性。

还可以用return false（会让这一条代码以上的代码无法执行，但无法阻止后续代码）。

4. `e.stopPropagation()`阻止冒泡。兼容性：`e.cancelBubble = true`。

#### 事件委托：

原理：不是每个子节点单独设置事件监听器，而是事件监听器设置在其父节点上，然后利用冒泡原理影响每个子节点。

```javascript
<ul>
	<li></li>
	<li></li>
</ul>

var ul = document.querySelector('ul');
ul.addEventListener('click',function(){
	e.target.backgroundcolor = pink;  //点击li使得li变色
})
```

#### 文字无法选中和右键菜单栏隐藏

```javascript
//1.contextmenu  我们可以禁用右键菜单
document.addEventListener('contextmenu',function(e){
	e.preventDefault();
})
//2.selectstart 禁止选中文字
document.addEventListener('selectstartt',function(e){
	e.preventDefault();
})
```

#### **鼠标事件对象**

```
e.clientX     返回鼠标相对于浏览器窗口可视区的X坐标
e.clientY     返回鼠标相对于浏览器窗口可视区的Y坐标
e.pageX       返回鼠标相对于文档页面的X坐标
e.pageY       返回鼠标相对于文档页面的Y坐标
e.screenX     返回鼠标相对于电脑屏幕的X坐标
e.screenY     返回鼠标相对于电脑屏幕的Y坐标
```

**如何做一个鼠标图案？**

```javascript
<style>
	img{
		position:absolute;
	}
</style>

<script>
	document.addEventListener('mousemove',function(){
		//1.mousemove 只要我们鼠标移动1px，就会触发这个事件
		var x = e.pageX；
		var y = e.pageY;
		pic.style.left = x + 'px';  //别忘了字符串拼接
		pic.style.top = y + 'px';
	});
</script>
```

#### 键盘事件对象

```
onkeyup
onkeydown
onkeypress (不能识别功能键 如 ctrl shift等)、
三个事件的执行顺序：keydown -> keypress ->keyup
```

`e.key`返回按下的键

`e.keycode`返回按下的键的ASCII码值

1. keyup和keydown事件不区分字母大小写。
2. keypress区分字母大小写。

#### 京东按S后focus搜索框

```javascript
var search = document.querySelector('input');
document.addEventListener('keyup',function(e){
	if(e.keyCode == 83){
		search.focus();
	}
})
```

