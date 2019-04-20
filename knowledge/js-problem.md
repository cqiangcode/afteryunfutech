# JS 的一些基本问题

1. async/await 中 await 执行时机问题

* await 会让出线程执行下面的代码
* async 返回值为 Promise.resolve()

```js
  // await 后面的函数会等到 async 的 Promise.resolve() 执行后的promise调用栈为空时才会向下继续执行
  // 也就是说 await 后面的要等两次 | Promse.resolve() 一次 | .then() 后的代码执行完才会跳入函数中继续执行
  async function app () {
      await add()
      console.log('22222222222222')
  }
  async function add() {
      console.log('1111111111111111111111')
  }
  app()
  Promise.resolve(() => console.log('33333333333'))
```

2. 基本算法

* 直接插入排序 | 算法复杂度也为 O(n^2) 但比选择和冒泡法要好

```js
  // 每次循环采用的是冒泡法
  function insertSort (array) {
      for (var i = 1; i < array.length; i++) {
 4             var key = array[i];
 5             var j = i - 1;
 6             while (j >= 0 && array[j] > key) {
 7                 array[j + 1] = array[j];
 8                 j--;
 9             }
10             array[j + 1] = key;
11         }
12         return array;
13     }
  }
```

* 快速排序

```js
  // 手写的快排算法
  // 1. 循环遍历 找到比 a[a.length - 1] 大的, 交换位置, 并赋值 base
  // 2. 从 base + 1 开始, 找到比 a[base] 小的 换位置 base ++
  // 3. 递归， quickSort(arr, left, base - 1) | quickSort(arr, base, right)
  // 跳出条件 left === right 所以时间复杂度 O(n log n)
  function quickSort (arr, left, right) {
       if (left < right) {
        let key = array[right];
        let base;
        for (let j = left; j <= right; j ++) {
            if (key <= array[j]) {
                swap(array, j, right)
                base = j;
                break;
            }
        }
        for (let i = base + 1; i < right; i ++) {
            if (array[i] >= key) {
                swap(array, base, base + 1);
                swap(array, base, i);
                base ++
            }
        }
        quickSort(array, left, base - 1)
        quickSort(array, base, right)
    }
  }
```

3. new 运算符 与 . 的优先级

```js
  // 变量声明提升会被函数声明提升覆盖
  new Foo.getName() // 先执行 Foo.getName()
  new Foo().getName() // 先执行 new Foo()
```

4. 防抖 | 节流

```js

  // 防抖 输入结束后一段时间再发请求 -------------> 触发事件后清除 timer，并新建一个
  // 节流 点击触发后一段时间点击没反应 -------------> 设置标志位 事件触发后 setTimeout(() => flag = 0, ms)
```

5. 每个函数都有唯一的闭包作用域