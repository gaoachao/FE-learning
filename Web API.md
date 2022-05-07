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
