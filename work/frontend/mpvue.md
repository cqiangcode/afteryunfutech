# 微信小程序框架和 mpvue 开发

## mpvue 脚手架可以依赖 vue-cli 搭建
```bash
  $ npm install -g vue-cli
  $ vue init mpvue/mpvue-quickstart my-project
  $ cd my-project
  $ npm install
  $ npm run dev
  # 之后启动微信开发者工具，引入项目
```

## mpvue 大体框架

![概览](https://github.com/cqiangcode/afteryunfutech/blob/master/images/general.png)
* main.js 入口文件 | 挂载整个应用
```js
  import Vue from 'vue'
  import App from './App'
  App.mptype = 'app'
  const app = new Vue(App)
  app.$mount()
```
* app.json | 参考文档https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html
```json
  // 基本用法
  {
      "pages": [
          "pages/index/main"
          // ...
      ],
      "window": {
          // 关于顶端的格式文字等操作
          "navigationBarBacgroundColor": "#fff",
          "navigationBarTitleText": "your title"
      },
      "tabBar": {
          // 对导航栏的设置
          "list": [{
              "text": "导航文本",
              "pagePath": "pages/index/main",
              "iconPath": "static/tabs/home.png",
              "selectedIconPath": "static/tabs/home-active.png"
          }
          // 其他跳转条
          ]
      }
  }
```
* App.vue
```vue
```
* pages/index/main.vue
```
  <tamplate>
    <card :text="userInfo">
  </template>
  <script>
  import card from '@components/card'
  export default {
      data () {
          return {
            userInfo: "mpvue"
          }
      },
      components: {
          card
      }
  }
  </script>
  <style>
  </style>
```

## 补充

### 小程序就是在组件和微信提供的api之上进行开发

1. mpvue 兼具 小程序 和 vue 的生命周期
2. 可以在 vue 组件中调用 小程序的 api
3. 小程序登录逻辑:
```js
  // 获取登录凭证, 传给后台拿session_key 和 openId相关信息
  wx.login({
      success(res) {
          console.log(res.code)
          wx.request({
              url: 'test.php',
              data: {
                  code: res.code
              },
              success (res) {
                  console.log(res.data)
                  wx.setStorageSync({
                      key,
                      data
                  })
              }
          })
      }
  })
  // 单纯展示用户信息
  '<open-data type="userAvatarUrl"></open-data>
   <open-data type="userNickName"></open-data>'
  // 获取用户基本信息 | 需要用户同意
  wx.getSetting({
      success(res) {
          res.authSetting['scope.userInfo'] // 判断用户是否授权
      }
  })
  '<button open-type="getUserInfo" @getUserInfo="getUserInfo" />'
  let getUserInfo = function () {
      wx.getUserInfo({
          success(res) {
            wx.setStorageSync({
                key: 'userinfo',
                value: res.userInfo
            })
          }
      })
  }
```