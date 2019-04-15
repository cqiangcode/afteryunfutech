# vue 开发过程中遇到的问题

1. v-for 和 v-model 的问题 | 原因暂时不了解

```html
  <!- 若 v-model 直接写 app 会产生问题, 要改成 app.attr -->
  <input v-for="(app,index) in data" v-model="app"></input>
```--