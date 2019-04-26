# 关于 webpack 的一些理解、

* webpack 打包 js 的最终样式
```js
  const final = (function(modules){
      var installedModules = {};
      function __webpack__require__(moduleId) {
          // 加载缓存
          if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
          }
          // 未缓存的去加载模块
          var module = installedModules[moduleId] = {
              i: moduleId,
              l: false,
              exports: {}
          }
          // 执行模块代码
          modules[moduleId].call(module.exports, module, module.exports, __webpack__require__)
          return module.exports;
      }

      return __webpack__require__(__webpack__require__.s = "./src/index.js")
  })({
      "./src/index.js": (function () {
          "use strict";
          // code...
      })
  })
```

* webpack entry
```js
  // 每一个属性代表一个 chunk,最终会生成一个 js 文件
  const webpack = {
      entry: {
          "a": "./a.js",
          "b": "./b.js"  // ["b.js", "main.js"]
          // ...
      }
  }
```
* webpack loaders
```js
  const webpack = {
      module: {
          loaders: [
              {
                  test: /\.css$/,
                  loader: ['style-loader', 'css-loader'] // loader 从右至左加载
              }
          ]
      }
  }
```
* webpack plugins
```js
  // 默认以 index.html 为模板, 生成的 js 插入 head 标签
  const webpack = {
      plugins: [
          new htmlWebpackPlugin({
              template: 'index.html',
              inject: 'head'
          })
      ]
  }
```