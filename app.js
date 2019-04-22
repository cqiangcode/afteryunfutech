// 约瑟夫环的实现

function Person (n) {
    this.n = n + 1;
    this.next = null;
}
let start = cycle = new Person(0)
for (let i = 1; i < 5; i ++) {
    cycle.next = new Person(i);
    cycle = cycle.next
}
cycle.next = start
function notToDie (start, n) {
    let died = [];
    let number = 1;
    let current = start;
    while(died.length < n) {
        number ++;
        if (number > 3) {
            number = 1
        }
        current = current.next;
        if (number === 3) {
            died.push(current.n);
        }
    }
    return died
}
console.log(notToDie(start, 5))
