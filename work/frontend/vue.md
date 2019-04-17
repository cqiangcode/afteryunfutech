# vue 开发过程中遇到的问题

1. v-for 和 v-model 的问题 | 原因暂时不了解

```html
  <!- 若 v-model 直接写 app 会产生问题, 要改成 app.attr -->
  <input v-for="(app,index) in data" v-model="app"></input>
```

2. 父子组件生命周期

```js
  // 父子组件生命周期执行顺序 | 初始化
  `
    father: beforeCreate 数据,事件等未初始化
    father: created 数据，事件等已产生，$el 未初始化
    father: beforeMount $el 初始化，但仍未挂载
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

* 若在方法中执行改值操作，只有在'\<template>'标签内使用的值才可以触发组件 beforeUpdate updated
* 注意事项 | 举例

```js
  // 父组件 | 若 mounted 之后改变 index 则会触发父组件 beforeUpdate updated
  `<Son :index="index" />`
  // 子组件 <template> 中若无 index，则不会触发子组件的 beforeUpdate updated | 如下
  `<div>{{ number }}</div>`
  `this.number = this.index`
  // 上述需要手动 watch index 才可以
  const watch = {
    index (val) {
      this.number = this.index
    }
  }
3. 判断点击事件是左键还是右键

```js
  const mousedown = function (e) {
    e.button === 0 || e.button === 2
  }
```

4. html5 原生拖拽

```html
  <!-- 拖拽目标区域只有阻止 dragover 的默认事件才能触发 drop -->
  <div class="origin" :draggable="true" @dragstart="dragstart"></div>
  <div class="target" @drop="drop" @dragover.prevent></div>
```