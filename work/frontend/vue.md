# vue 开发过程中遇到的问题

1. v-for 和 v-model 和 v-if 的问题

```js
  // v-for 为浅度克隆，所以不和 v-model 一起用
  const a = [1, 2, 3]
  for (let i in a) {
    i = 5
  }
  // 改进版
  a[index] = 5 // 或者 a[index] 为对象
```

* v-for中指定 key 是因为虚拟 dom 的 diff 算法
* 就地复用: vue 为了高效渲染，会把同类型的组件进行复用，加入独一无二的 key 就可以避免就地复用
```js
  // 按目前的理解 就地服用是为了防止频繁操作dom而导致的 reflow 回流
```

```html
  <!- 若 v-model 直接写 app 会产生问题, 要改成 app.attr 或者 data[index] -->
  <input v-for="(app,index) in data" v-model="app"></input>
```

* v-model 指令详解

```bash
  # v-model="searchText" 相当于
  # 1. v-bind:value="searchText" v-on:input="searchText = $event.target.value
```

```js
  // v-for 优先级比 v-if 高，在一起会影响性能，可以用 computed 代替
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

* vue 在渲染组件时会将关联的数据放入 Observer 中, 并持续监听数据的动态变化

3. 在鼠标相关点击事件 onmousedown, onmouseup, click 等可以通过 $event.button 来区分左右键 (0 左键 | 2 右键)

4. html5 原生拖拽

```html
  <!-- 拖拽目标区域只有阻止 dragover 的默认事件才能触发 drop -->
  <div class="origin" :draggable="true" @dragstart="dragstart"></div>
  <div class="target" @drop="drop" @dragover.prevent></div>
```

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