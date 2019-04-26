function Node(value) {
  this.value = value
  this.next = null
}
const start = new Node('start')
// 头插法
'internet'.split('').forEach(ele => {
  let p = start.next
  start.next = new Node(ele)
  start.next.next = p
})
let p = start;
while (p !== null) {
    console.log(p.value);
    p = p.next;
}
