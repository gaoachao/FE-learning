# JavaScript 中 == 和 === 的区别

和其他语言有些不同，在 JavaScript 中除了用`==`操作符来判断是否相等外，还有一个`===`操作符，它们的区别是：`==`操作符会先将两边的值进行强制类型转换再比较是否相等，而`===`操作符不会进行类型转换。`==`操作符只要求比较两个值是否相等，而`===`操作符不仅要求值相等，而且要求类型相同。`!=`和`!==`的区别也是类似的，`!=`号会做强制类型转换，而`!==`不会。

```javascript
55 == '55'
// true
55 === '55'
// false
```

第一个操作数是数值类型的`55`，第二个操作数是字符串类型的`"55"`。当一个操作数是字符串，另一个操作数是数值的时候，操作符`==`会把字符串转换成数值，所以结果就返回了`true`。而`===`不会做强制转换，所以数值类型的`55`和字符串类型的`"55"`当然是不相等的了。

```js
NaN == NaN
// false
NaN === NaN
// false
```

这里有一个特殊值`NaN`，即 Not a Number，表示非数字，它和任何数做相等比较，包括它自己，都会返回`false`。所以判断`NaN`最好用`isNaN()`函数。

```js
null == undefined
// true
null === undefined
// false
```

`null`也让人觉得难以理解。`null`用来表示空值，`undefined`用来表示不存在，但这在实际开发中并没有什么用，而且==和===对它们的处理也不一样。



