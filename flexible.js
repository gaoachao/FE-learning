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
