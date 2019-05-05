# 前端经典十道面试题

1. 数字每三位加逗号
```js
  let reg1 = /\B(?=(\d{3})+$)/g // ','
  let reg2 = /(\d)(?=(\d{3})+$)/g // '$1,'
```
2. 从给定字符串中找出无重复字符的最长子字符串的长度
```js
  // 算法复杂度 O(n2)
  function maxLen (str) {
    let maxLen = 0
    for(let i = 0; i < str.length; i ++) {
        let temp = str[i]
        let max = 1
        for (let j = i + 1; j < str.length; j ++) {
            if (temp.indexOf(str[j]) === -1) {
                temp += str[j]
                max ++
            } else {
                maxLen = Math.max(maxLen, max)
                break
            }
        }
    }
    return maxLen
}
```
3. 超大整数的加法运算 | 36 进制 (0 - 9 , a - z)
```js
function outOfRange(a, b) {
    let nA, nB, temp
    nA = a.split('').reverse()
    nB = b.split('').reverse()
    for (let i = 0; i < nA.length; i++) {
        temp = transform(nA[i]) + transform(nB[i])
        if (temp >= 10) {
            nA[i] = transform(temp - 10)
            nA[i + 1] = transform(transform(nA[i + 1]) + 1)
        } else {
            nA[i] = transform(temp)
        }
    }
    return nA.reverse().join('')
}
// 具体转换规则如下，可拓展
function transform (value) {
  if (typeof value === 'number') {
    return String.fromCharCode(value + 48)
  } else {
    return value ? value.charCodeAt(0) - 48 : 0
  }
}
```