# javascript 设计模式

## 1. 基本概念 | 2. 基本技巧 | 3. 字面量和构造函数 | 4. 函数 | 5. 对象创建模式 | 6. 完美继承 | 7. 设计模式 | 8. DOM操作和脚本载入策略

## 基本技巧 | a = 2; 会挂载到全局对象, var a = 2; 则不会

1. 尽量少使用全局变量

2. for in 循环遍历对象 | for of 循环遍历数组 | 只遍历 可枚举 属性 | 可以通过 Object.hasOwnProperty() 过滤原型上 可枚举 变量

3. parseInt(string, radix) | string 以 radix 为基数
```js
  parseInt('23', 1) // NaN
  parseInt('23', 8) // 2 * 8 + 3 = 16
```

4. 原型   对象.__proto__ = 构造函数.prototype
```js
  function app () {}
  const a = new app();
  a.__proto__ == app.prototype; //  值为: constructor: function app() {}, __proto__: Object.prototype
  app.__proto__ == Function.prototype; // true
  Function.__proto__ == Function.prototype; // true
  // 构造函数才有 prototype | 函数名.prototype 无 prototype 属性
```

5. 检查变量是否为数组
```js
  Array.isArray(name);
  Object.prototype.toString.call(name) == "[object Array]"
```

6. Function.prototype.apply() || Function.prototype.call()

7. 函数科里化
```js
  // 通用写法
  function currylize (fn) {
    var slice = Array.prototype.slice,
        stored_args = slice.call(arguments, 1);
    return function () {
      var new_args = slice.call(arguments),
          args = stored_args.concat(new_args);
          return fn.apply(null, args);
    }
  }
```

8. 沙盒模式
```js
  function Sandbox () {
    var args = Array.prototype.slice.call(arguments),
        callback = args.pop(),
        modules = (args[0] && typeof args[0] === "string") ? args : args[0],
        i;
        if (!(this instanceof Sandbox)) {
          return new Sandbox(modules, callback);
        }
        this.a = 1;
        if (!modules || modules === '*') {
          modules = [];
          for (i in Sandbox.modules) {
            if (Sandbox.modules.hasOwnProperty(i)) {
              modules.push(i);
            }
          }
        }
        for (i = 0; i < modules.length; i ++) {
          Sandbox.modules[modules[i]](this)
        }
        callback(this);
  }
```

9. 构造函数继承 | 圣杯模式
```js
  function inherit (C, P) {
    var F = function () {};
    F.prototype = P.prototype;
    C.prototype = new F();
    C.prototype.constructor = C;
  }
```

10. 手写深度复制
```js
  function deepClone (object) {
    let toStr = Object.prototype.toString(),
        arStr = "[object Array]",
        result = toStr(object) === arStr ? [] : {};
    for (var i in object) {
      if (typeof i === "object") {
        result[i] = deepClone(object[i]);
      } else {
        result[i] = object[i];
      }
    }
    return result
  }
```

11. mix-in 混入模式
```js
  function mix() {
    var args, prop, child = {};
    for (arg = 0; arg < arguments.length; arg ++) {
      for (prop in arguments[arg]) {
        if (arguments[arg].hasOwnProperty(prop)) {
          child[prop] = arguments[arg][prop];
        }
      }
    }
    return child;
  }
```
12. Function.prototype.bind
```js
  Function.prototype.bind = function (thisArg) {
    var fn = this,
        slice = Array.prototype.slice,
        args = slice.call(arguments, 1);
    return function () {
      return fn.apply(thisArg, args.concat(slice.call(arguments)));
    }
  }
```

## 设计模式

* 模式简介
```js
  /* 
   * 1. 工厂模式: 给一造一
   * 2. 迭代器模式: next() 可以遍历数组建立对象
   * 3. 装饰者模式: 给定 list 动态添加方法 [...decorates] 前者的返回值给后者当参数
   * 4. 外观模式: 针对兼容给出统一接口
   * 5. 代理模式: ajax 点击添加进数组，500ms后不点击再统一发 ajax 请求
   * 6. 中介者模式: 对象之间通过中介者进行通信
   * 7. 观察者模式: 将事件通告给所有观察者
   */
```

1. 工厂模式
```js
  // var corolla = CarMaker.factory('Compact');
  function Carmaker () {}
  Carmaker.prototype.drive = function () { return "Vroom, I drive " + this.doors + " doors"; }
  Carmaker.factory = function (type) {
    var constr = type,
        newCar;
    if (typeof Carmaker[constr].prototype.drive !== "function") {
      Carmaker[constr].prototype = new Carmaker();
    }
    newCar = new Carmaker[constr]();
    return newCar;
  }
  CarMaker.compact = function () { this.doors = 4; }
```
2. 迭代器模式 | agg.next() 循环数组生成不同的对象
```js
  // agg.next() --> 1 | agg.next() --> 3
  var agg = (function () {
    var index = 0,
        data = [1, 2, 3, 4, 5],
        length = data.length;
    return {
      next: function () {
        var element;
        if (!this.hasNext()) {
          return null;
        }
        element = data[index];
        index += 2;
        return element;
      },
      hasNext: function () {
        return index < length;
      }
    }
  })();
```
3. 装饰者模式 | new Sale(); ==> sale.decorate('fedtax')
```js
  function Sale(price) {
    this.price = price > 0 ? price : 100;
    this.decorators_list = [];
  }
  Sale.decoratos = {};
  Sale.decorators.fedtax = {
    getPrice (price) {
      return price + price * 5 / 100;
    }
  }
  Sale.prototype.decorate = function (decorator) {
    this.decorators_list.push(decorators);
  }
  Sale.prototype.getPrice = function () {
    var price = this.price,
        i,
        max = this.decorators_list.length,
        name;
    for (i = 0; i < max; i ++) {
      name = this.decorators_st[i];
      price = Sale.decorators[name].getPrice(price);
    }
    return price;
  }
```
4. 策略模式 | 根据 config 拿出对应的 检验函数，对对应的数据进行校验
```js
  var validator = {
    types: {},
    messages: [],
    config: {},
    validate (data) {
      var i, msg, type, checker, result_ok;
      this.messages = [];
      for (i in data) {
        if (data.hasOwnProperty(i)) {
          // 拿出属性对应的 验证函数
          type = this.config[i];
          checker = this.types[type];
          if (!type) {
            continue;
          }
          if (!checker) {
            throw {
              name: "ValidationError",
              message: "No handler to validator type " + type
            }
          }
          result_ok = checker.validator(data[i]);
          if (!result_ok) {
            msg = "Invalid value for *" + i + "*, " + checker.instructions;
            this.messages.push(msg);
          }
        }
      }
      return this.hasError();
    },
    hasError () {
      return this.messages.length !== 0;
    }
  }
```
5. 外观模式 | 内部对浏览器兼容进行封装，提供对外统一接口
```js
  var myevent = {
    stop (e) {
      if (typeof e.preventDefault === "function") {
        e.preventDefault();
      }
      if (typeof e.returnValue === "boolean") {
        e.returnValue = false;
      }
    }
  }
```
6. 代理模式 | 事件委托 + 50ms 延迟请求

7. 中介者模式 | 中介负责通知各个对象的方法以及属性调用
```js
  // player 对象
  function Player (name) {
    this.points = 0;
    this.name = name;
  }
  Player.prototype.play = function () {
    this.points += 1;
    mediator.played();
  }
  // 计分板
  var scoreboard = {
    element: document.getElementById('results'),
    update: function (score) {
      var i, msg = '';
      for (i in score) {
        if (score.hasOwnProperty(i)) {
          msg += '<p><strong>' + i + '<\/strong>: ';
          msg += score[i];
          msg += '<\/p>';
        }
      }
      this.element.innerHTML = msg;
    }
  };
  // 中介
  var mediator = {
    players: {},
    setup: function () {
      var players = this.players;
      players.home = new Player('Home');
      players.guest = new Player('Guest');
    },
    played: function () {
      var players = this.players,
          score = {
            Home: players.home.points,
            Guest: players.guest.points
          };
      scoreboard.update(score);
    },
    keypress: function (e) {
      e = e || window.event;
      if (e.which === 49) {
        mediator.players.home.play();
        return;
      }
      if (e.which === 48) {
        mediator.players.guest.play();
        return;
      }
    }
  }
  mediator.setup();
  window.onkeypress = mediator.keypress;
  setTimeout(function () {
    window.onkeypress = null;
    alert('Game over!');
  }, 30000);
```

8. 观察者模式 | 事件发布 事件订阅
```js
  // 通用发布者模型
  var publisher = {
    subscribers: {
      any: []
    },
    subscribe (fn, type) {
      type = type || 'any';
      if (typeof this.subscribes[type] === "undefined") {
        this.subscribers[type] = [];
      }
      this.subscribers[type].push(fn);
    },
    unsubscribe (fn, type) {
      this.visitSubscribers('unsubscribe', fn, type);
    },
    publish (publication, type) {
      this.visitSubscribers('public', publication, type);
    },
    visitSubscribers (action, arg, type) {
      var pubtype = type || 'any',
          subscribers = this.subscribers[pubtype],
          i,
          max = subscribers.length;
      for (i = 0; i < max; i ++) {
        if (action === 'publish') {
          subscribers[i](arg);
        } else {
          if (subscribers[i] === arg) {
            subscribers.splice(i, 1);
          }
        }
      }
    }
  }
  // 将普通对象变为发布者
  function makePublisher (o) {
    var i;
    for (i in publisher) {
      if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
        o[i] = publisher[i];
      }
    }
    o.subscribers = { any:[] }
  }
  // 构造发行者
  var paper = {
    daily: function () {
      this.publish("big news today")；
    }，
    monthly: function () {
      this.publish("interesting analysis", "monthly");
    }
  };
  makePublisher(paper);
  // 构造订阅者
  var joe = {
    drinkCoffee: function (paper) {
      console.log('Just read ' + paper);
    },
    sundayPreNap: function (monthly) {
      console.log('About to fall asleep reading this ' + monthly);
    }
  };
  // 订阅者订阅
  paper.subscribe(joe.drinkCoffee);
  paper.subscribe(joe.sundayPreNap, 'monthly');
  // 发布者行为
  paper.daily();
  paper.monthly();
```

## dom 操作

* 活用 fragment 文档碎片
```js
  var p, t, frag;
  frag = document.createDocumentFragment();
  p = document.createElement('p');
  t = document.createTextNode('first paragraph');
  p.appendChild(t);
  frag.appendChild(p);
  p = document.createElement('p');
  t = document.createTextNode('second paragraph');
  p.appendChild(t);
  frag.appendChild(p);
  // 将文档碎片插入 dom 
  document.body.appendChild(frag);
```
* Web Workers
```js
  var ww = new Worker('my_web_worker.js');
  ww.onmessage = function (event) {
    document.body.innerHTML += "<p>message from the background thread: " + event.data + "</p>";
  }
  // my_web_worker.js
  postMessage('hello there');
```
* 性能上考虑
```
  1. 合并 js 文件
  2. 精简和压缩 js 文件
  3. Expires 设置本地缓存 | cache-control: max-age
  4. 使用 CDN
  5. defer 异步下载完，元素解析完成执行，按顺序 | async 异步下载完立即执行，无顺序
```
* js 文件的延迟加载，按需加载，预加载
```js
  // 按需加载 | 在 script 标签中
  window.onload = function () {
    var script = document.createElement("script");
    script.src = "all_lazy_20100426.js";
    document.documentElement.firstChild.appendChild(script);
  }
  // 按需加载
  requrie("extra.js", function () {
    functionDefinedInExtraJS();
  })
  function requrire(file, callback) {
    var script = document.getElementsByTagName('script')[0],
        newjs = document.createElement('script');
    newjs.onload = function () {
      callback();
    }
    newjs.src = file;
    script.parentNode.insertBefore(newjs, script);
  }
  // 预加载
  var preload;
  preload = function (file) {
    var obj = document.createElement('object'),
        body = document.body;
    obj.width = 0;
    obj.height = 0;
    obj.data = file;
    body.appendChild(obj);
  }
```