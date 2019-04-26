# javascript 设计模式

## 基本技巧 | a = 2; 会挂载到全局对象, var a = 2; 则不会

1. 尽量少使用全局变量

2. for in 循环遍历对象 | for of 循环遍历数组 | 只遍历 可枚举 属性 | 可以通过 Object.hasOwnProperty() 过滤原型上 可枚举 变量

3. parseInt(string, radix) | string 以 radix 为基数

4. 原型   对象.__proto__ = 构造函数.prototype
```js
  function app () {}
  const a = new app();
  a.__proto__ == app.prototype; //  值为: constructor: function app() {}, __proto__: Object.prototype
  app.__proto__ == Function.prototype; // true
  Function.__proto__ == Function.prototype; // true
  // 构造函数才有 prototype
```

5. 检查变量是否为数组
```js
  Array.isArray(name);
  Object.prototype.toString.call(name) == "[object Array]"
```

6. 止于 page 75