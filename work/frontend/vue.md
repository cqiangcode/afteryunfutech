# vue 开发过程中遇到的问题

```js
  // vue 数据绑定大致思路
  /* Observer() 将数据通过 get set 进行改造
   * Watcher 将监听数据变化
   * Dep 在渲染时将用到的数据的 Watcher 进行保存，并在数据改变时通知 watcher 进行重新 compile
   * compile 根据 diff 算法生成新的 虚拟 dom
   */
```

* 数据双向绑定的原理

```js
  // Object.defineProperty(原对象, 属性名, descriptor)
  var bValue;
  Object.defineProperty(o, 'b', {
    get: function () {
      return bValue
    },
    set: function (newValue) {
      bValue = newValue
    }
  });
```

1. v-for 和 v-model 和 v-if 的问题

* v-for 与 v-if | v-for 优先级高
```js 
  // 推荐使用
  const computed = {
    isSelected： function () {
      return this.array.filter(ele => ele > 0)
    }
  }
```
* v-for 和 v-model | v-for 为浅度克隆
```js
  '\<input v-for="(info, index) in array" v-model="info"></input>'
  // 可用的解决方案
  '\<input v-for="(info, index) in array" v-model="array[index]"></input>'
  '\<input v-for="(info, index) in array" v-model="info.content"></input>'
```
* v-for 和 key | vue 就地复用策略
```js
  // 简单的 v-bind 实现
  var input = document.getElementsByClassName('input')
  var vm = {
    value: [0, 1],
    name: 'vm'
  }
  Array.prototype.slice.call(input, 0).forEach((input, index) => {
    Object.defineProperty(vm.value, index, {
      get() {
        return input.value
      },
      set(newValue) {
        input.value = newValue
      }
    })
  })
  // 如果 v-for 循环下 input 子组件未绑定任何变量，那么就会就地复用，出现下列情况
  // 参考链接 https://www.zhihu.com/question/61078310/answer/361261031
  // 加了 key 就不会就地复用
```
* vue 的 diff 算法
```js
  // 将新旧虚拟 dom 进行最小化差异比对
```

2. 父子组件生命周期

```
  beforeCreate: 组件数据和方法均未初始化
  created: 组件数据和方法已挂载，未生成虚拟 dom
  beforeMount: 生成虚拟 dom, 并未挂载到真正 dom 上
  mounted: 组件已经挂载到真正的 dom 上
```

```js
  // 父子组件生命周期执行顺序 | 初始化
  `
    father: beforeCreate 
    father: created 
    father: beforeMount 
    son: beforeCreate
    son: created
    son: beforeMount
    son: mounted
    father: mounted
  `
  // 父子组件生命周期执行函数 | 更新时
  `
    father: beforeUpdate
    son: beforeUpdate
    son: updated
    father: updated
  `
```

3. vue 文档翻阅

* 动态绑定 class 问题
```html
  <div :class="[{ active: isActive, static: isStatic }, error]"></div>
```
* template + v-if 渲染分组
```html
  <template v-if="ok">
    <h1>Hello</h1>
    <h2>World</h2>
  </template>
```

* v-if 和 v-show

```
  v-if: 更高的切换开销 | display: none
  v-show: 更高的初始渲染开销 | visibility： hidden
```

* v-for 对于 对象

```html
  <!-- 结果按 Object.keys() 的顺序遍历 -->
  <html v-for="(value, key, index) in object"></html>
```

* 不是响应性的数组变动

```js
  vm.items[index] = newValue
  vm.items.length = newLength
```
* vue 事件修饰符 | 按键修饰符 | 系统修饰键 | 鼠标按钮修饰符
```js
  // 事件修饰符
  const event = {
    ".stop": "event.stopPropagation",
    ".prevent" : "event.preventDefault",
    ".once": "只触发一次"
  }
  // 按键修饰符
  `
    v-on:keyup.enter
  `
  // 系统修饰符
  `
    .ctrl
    .alt
    .shift
    .meta
  `
  // 鼠标按键修饰符
  `
    .left
    .right
    .middle
  `
```








### vue 内在

```js
  // 向嵌套对象添加响应式属性
  Vue.set(vm.someObject, 'b', 2) || this.$set(this.someObject, 'b', 2)
  // 鉴于更新 dom 操作是有异步队列的
  Vue.nextTick(callback) || vm.$nextTick(callback) || vm.$nextTick()  // 返回 promise 对象
```