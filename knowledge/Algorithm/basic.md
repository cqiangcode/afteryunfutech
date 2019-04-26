# 数据结构的基本概念和几种类型

* 算法事件复杂度: O(1) < O(logn) < O(n) < O(nlogn) < O(n^2) < O(2^n) < O(n!)

```
  最坏情况运行时间
  平均运行时间
```

1. 线性表

* 顺序存储表:

```
  一般开辟的连续空间的个数固定
  时间复杂度: 读写 O(1) 随机储存结构 | 插入删除 O(n)
```

* 单链表 | 可以有头节点 | 头指针指向头节点或者第一个元素，头节点可有可没有

```
  可以是非连续的地址空间，可拓展性强
  时间复杂度: 读写 O(n) | 插入删除 O(n) | 连续插入或删除 单个操作为O(1)
```

```js
function Node(value) {
  this.value = value
  this.next = null
}
const start = new Node(0)
// 头插法
while (true) {
    let p = start.next;
    start.next = new Node(0);
    start.next.next = p;
}
// 尾插法
let p = start
while (true) {
  p.next = new Node(0)
  p = p.next
}
```

* 静态链表
```
  arr[0] 存放备用链的起始位置 | arr[arr.length - 1] 存放链表的起始位置
  数组模拟链表的实现 | 每个元素存储 数据域 和 游标域
```
* 单循环链表 | 中点指针指向头节点
