// 练习 2.9
// 1.
function Student(name) {
  this.name = name
  this.scores = {}
}
Student.prototype.addScore = function(object) {
  for (var subject in object) {
    if (object.hasOwnProperty(subject)) {
      this.scores[subject] = object[subject]
    }
  }
  return this
}
Student.prototype.consoleAvgScore = function() {
  let sum = 0,
    scores = this.scores,
    i = 0
  for (var subject in scores) {
    if (scores.hasOwnProperty(subject)) {
      sum += scores[subject]
      i++
    }
  }
  return sum / i
}
console.log(
  new Student('xiaoming').addScore({ math: 90, english: 70 }).consoleAvgScore()
)
// 2.
function save(...arr) {
  return arr
}
function consoleArr(arr) {
  arr.forEach(ele => console.log(ele))
  return arr
}
function consoleReverse(arr) {
  arr.reverse().forEach(ele => console.log(ele))
  return arr
}
consoleReverse(consoleArr(save('xiaobai', 'xiaohong', 'xiaolv', 'xiaozi')))
// 练习 3.5
// 1.
function insertLarger(n, i, arr) {
  if (!arr.filter(ele => ele > n).length) {
    arr.splice(i, 1, n)
  }
}
// 2.
function Person(name, sex) {
  this.name = name
  this.sex = sex
}
const persons = []
for (let i = 0; i < 10; i++) {
  persons.push(
    new Person(i < 5 ? 'xiaoqiang' : 'xiaoming', i < 4 ? 'male' : 'female')
  )
}
function selectSameSex(persons) {
  let sameSex = {}
  persons.forEach(person => {
    if (sameSex[person.sex]) {
      sameSex[person.sex].push(person.name)
    } else {
      sameSex[person.sex] = [person.name]
    }
  })
  return sameSex
}
selectSameSex(persons)

// 优先级队列
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
for (let i = 0; i < 10; i++) {
  insertQueue(
    new Patient('xiaoli', Math.floor(Math.random() * 10) + 1),
    patients
  )
}
console.log(patients)

// 练习 6.7
// 循环列表 | 约瑟夫环
function Node(value) {
  this.value = value
  this.next = null
}
let start = new Node(0);
// 删除节点 | 如果删除的是 start 那么 start 指向 start.next | 让 被删除元素的前者指向其后者
Node.prototype.kill = function() {
  let temp = this.next
  let p = start
  while (p.next !== this) {
    p = p.next
  }
  if (start === this) {
    start = start.next
  }
  p.next = temp
}
for (let i = 1; i < 41; i++) {
  let p = new Node(i),
    temp = start
  while (temp.value !== i - 1) {
    temp = temp.next
  }
  temp.next = p
  if (i === 40) {
    p.next = start
  }
}
let p = start,
  count = 1
while (p.next.next !== p) {
  if (count % 3 === 0) {
    let temp = p.next;
    p.kill();
    p = temp;
    count = 1
  } else {
    count++
    p = p.next;
  }
}

// 7.4 练习
function splitWord(words) {
  let result = {};
  words.trim().split(' ').forEach(word => {
      if (result[word]) {
          result[word] ++;
      } else {
          result[word] = 1;
      }
  });
  return result;
}
