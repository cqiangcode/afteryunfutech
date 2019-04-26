// 列表

/*
 * 栈的应用
 */

// Stack 类模拟
function Stack () {
    this.dataStore = [];
    this.top = 0;
    this.pop = pop;
    this.push = push;
    this.peek = peek;
    this.clear = clear;
    this.length = length;
}
function push (element) {
    this.dataStore[this.top++] = element;
}
function peek () {
    return this.dataStore[this.top - 1];
}
function pop () {
    return this.dataStore[--this.top];
}
function clear () {
    this.top = 0;
}
function length () {
    return this.top;
}
// 栈模拟递归
function factorial (n) {
    var s = new Stack();
    for (; n > 1; n --) {
        s.push(n);
    }
    var product = 1;
    while (s.length() > 0) {
        product *= s.pop();
    }
    return product;
}
// 括号匹配
function isStandard (express) {
    let s = new Stack();
    express.split('').forEach((ele) => {
        if (ele === '(') {
            s.push('(');
        } else if (ele === ')') {
            if (!s.length()) {
                return '表达式不合格';
            }
            s.pop();
        }
    })
    if (s.length()) {
        return '表达式不合格';
    } else {
        return '表达式合乎规范';
    }
}
// 后缀表达式转中缀并求值 有空再写
// function endToMiddle (express) {
//     const operater = new Stack();
//     const temp = new Stack();
//     express.split(' ').forEach((ele) => {
//         let parse = parseInt(ele);
//         if (String(parse) !== 'NaN') {
//             temp.push(ele);
//         } else {
//             if (!operater.length() || operater.peek() === '(') {
//                 operater.push(ele);
//             } else if () {

//             } else 
//         }
//     })
// }

// 队列模拟
function Queue () {
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty; 
}
function enqueue (element) {
    this.dataStore.push(element);
}
function dequeue () {
    return this.dataStore.shift();
}
function front () {
    return this.dataStore[0];
}
function back () {
    return this.dataStore[this.dataStore.length - 1];
}
