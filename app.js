
let a = '9',
    b = '99999999999999999'

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
function transform (value) {
  if (typeof value === 'number') {
    return String.fromCharCode(value + 48)
  } else {
    return value ? value.charCodeAt(0) - 48 : 0
  }
}

console.log(outOfRange(a, b))
// outOfRange(a, b)