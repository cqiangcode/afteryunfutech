# axios 的基本使用

* cnpm install axios --save
```js
  // 创建一个 axios 实例
  const axiosInstance = axios.create({
      baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8000'
  })
  // 设置请求或响应拦截器
  axiosInstance.interceptors.request/* response */.use(config => {
      // do something before request or response
  })
```

* 基本用法
```js
  axios.post('/user', data).then().catch()
  axios.get('/user').then().catch()
```