# 数据结构与算法 javascript 版

- 列表 随机存储 | 栈 先进后出 | 队列 先进先出 | 链表

## 队列

1. 优先队列

```js
function Patient(name, code) {
  this.name = name
  this.code = code // 1-10 | 10 优先级最高
}
let patients = []
function insertQueue(patient, patients) {
  let i = patients.findIndex(ele => ele.code < patient.code)
  if (i === -1) {
    patients.push(patient)
  } else {
    patients.splice(i, 0, patient)
  }
}
```

## 链表

1. 单向链表

```js
// 链表的实现
function Node(value) {
  this.value = value
  this.next = null
}
const header = new Node('header')
for (let i = 0; i < 10; i++) {
  //   头插法
  //   let temp = header.next;
  //   header.next = new Node(i);
  //   header.next.next = temp;
  //   尾插法
  let temp = header
  while (temp !== null) {
    temp = temp.next
  }
  temp.next = new Node(i)
}
```

2. 双向链表

```js
function Node(value) {
  this.value = value
  this.next = null
  this.previous = null
}
const header = new Node('header')
for (let i = 0; i < 10; i++) {
  let p = new Node(i),
    temp
  // 头插法 每次要改 header.next, header.next.previous
  temp = header.next
  header.next = p
  p.previous = header
  p.next = temp
  temp.previous = p
}
```

3. 循环列表

```js
function Node(value) {
  this.value = value
  this.next = null
}
const header = new Node('header')
header.next = header
for (let i = 0; i < 10; i++) {
  //   头插法
  //   let temp = header.next;
  //   header.next = new Node(i);
  //   header.next.next = temp;
  //   尾插法
  let temp = header
  while (temp !== null) {
    temp = temp.next
  }
  temp.next = new Node(i)
}
```

## 散列

- 散列数组的长度最好为质数 | 为了数组均匀分布

```js
// 霍纳算法有利于数据的散列结果排布
function betterHash(string) {
  const H = 37
  var total = 0
  for (var i = 0; i < string.length; i++) {
    total += H * total + string.charCodeAt(i)
  }
  total = total % this.table.length
  if (total < 0) {
    total += this.table.length - 1
  }
  return parseInt(total)
}
```
