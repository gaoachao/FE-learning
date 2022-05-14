#  PC端网页特效

### 元素偏移量offset

```
offsetTop
offsetLeft
offsetWidth
offsetHeight
offsetParent
```

1. `offsetLeft`  `offsetTop` 以带有定位的父亲为准，如果没有父亲或者父亲没有定位，则以body为准，返回距离上边和距离左边的偏移量。
2. `offsetWidth`  `offsetHeight`可以得到元素的大小（包括宽度和高度），这个值是`padding + border + width`。
3. `offsetParent`返回的是带有定位的父亲，否则返回body。

#### `offset`与`style`的区别

1. offset可以得到任意样式表中的样式值，而style只能得到行内样式表中的样式值。
2. offset系列得到的数值是没有单位的，而style.width得到的是带有单位的字符串。
3. offsetWidth为`padding + border + width`，而style.width不包含。
4. offsetWidth等属性是只读属性，只能获取不能赋值，而style.width是可读写属性，可以获取也可以赋值。
5. 总结：想获取元素大小用offser，想给元素更改值，用style。

#### 得到鼠标在某个盒子内的坐标

```javascript
box.addEventListener('mousemove',function(e){
	var x = e.pageX - this.offsetLeft;
	var y = e.pageY - this.offsetTop;
})
```

#### 拖动模态框

```javascript
box.addEventListener('mousedown',function(e){
	var x = e.pageX - login.offsetLeft;
	var y = e.pageY - login.offsetTop;
    document.addEventListener('mousemove',move)
     function move(e){
        	login.style.left = e.pageX - x + 'px';
        	login.style.top = e.pageY - y + 'px';
    }
    document.addEventListner('mouseup',function(){
         	document.removeEventListener('mousemove',move);
    })
})
```

### 元素可视区client

client系列跟offset系列最大的区别在于其不包括border但包括padding。

```javascript
clientTop       返回元素上边框的大小
clientLeft		返回元素左边框的大小
```

#### flexible源码分析

```javascript
(function flexible (window, document) {
    //获取的html根元素<html>
    var docEl = document.documentElement
    //dpr 物理像素比  前者是移动端，后者是PC端（默认为1）
    var dpr = window.devicePixelRatio || 1
  
    // adjust body font size
    function setBodyFontSize () {
      //如果页面中有body这个元素，就设置body的字体大小
      if (document.body) {
        document.body.style.fontSize = (12 * dpr) + 'px'
      }
      //这是为了防止script标签放在body标签之前而没有body标签出现的一种做法。
      else {
        document.addEventListener('DOMContentLoaded', setBodyFontSize)
      }
    }
    setBodyFontSize();
  
    // set 1rem = viewWidth / 10
    // 设置html元素的字体大小
    function setRemUnit () {
      var rem = docEl.clientWidth / 10
      docEl.style.fontSize = rem + 'px'
    }
  
    setRemUnit()
  
    // reset rem unit on page resize
    // 当页面尺寸大小发生变化的时候重新设置rem
    window.addEventListener('resize', setRemUnit)
    // pageshow是页面出现的时候会触发的事件
    // e.persisted 返回的是true 如果这个页面是从缓存取过来的页面，也需要重新计算一下rem的大小
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        setRemUnit()
      }
    })
  
    // detect 0.5px supports
    // 原因是有些移动端的浏览器不支持0.5像素的写法
    if (dpr >= 2) {
      var fakeBody = document.createElement('body')
      var testElement = document.createElement('div')
      testElement.style.border = '.5px solid transparent'
      fakeBody.appendChild(testElement)
      docEl.appendChild(fakeBody)
      if (testElement.offsetHeight === 1) {
        docEl.classList.add('hairlines')
      }
      docEl.removeChild(fakeBody)
    }
  }(window, document)) 

```

#### `pageshow`和`load`的区别

首先需要明白下面三种情况都会触发load事件：

1. a标签的超链接。
2. F5或者刷新按钮。
3. 前进后退按钮。

但是在火狐浏览器中有一个“往返缓存”，这个缓存中不仅保存这页面数据，还保存这DOM和JavaScript的状态，实际上是将整个页面都保存在了内存里面。所有此时后退按钮不能刷新页面。

此时可以使用`pageshow`事件来触发，这个事件在页面显示的时候触发，无论页面是否来自缓存，在重新加载页面中，`pageshow`会在load事件触发后触发；根据事件对象中的persisted来判断是否是缓存中的页面触发的`pageshow`事件。

### 元素滚动scroll

```
scrollTop		返回被卷去的上侧距离，返回数值不带单位
scrollLeft		返回被卷去的左侧距离，返回数值不带单位
scrollWidth		返回自身实际的宽度，不含边框，返回数值不带单位
scrollHeight	返回自身实际的高度，不含边框，返回数值不带单位
window.pageYOffset		页面被卷去的头部长度，返回数值不带单位
```

#### 页面被卷去头部长度兼容性问题

1. 声明了`DTD`，使用`document.documentElement.scrollTop`
2. 未声明`DTD`，使用`document.body.scrollTop`
3. 新方法（IE9开始支持）`window.pageYOffset`和`window.pageXOffset`

```javascript
function getScroll(){
	return{
		left:window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLetf || 0;
		top:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	}
}
//然后在使用的时候  getScroll().left 或者 getScroll().top 
```

