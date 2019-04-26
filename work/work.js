// 利用 window.getSelection() 实现 多颜色的文本显示功能 demo

const copy = 'appppppapppppapppppppappppppppapppppppppapppppppppp'
const artice = [{ content: 'apppppppppp', type: 'plain' }]

const action = ['reason', 'trigger', 'result']

function pasted(index, start, end) {
    // 先处理选取的文本不在文章中的情况
    let selected = 'apppppapp'
    // 寻找异色的数组及其在文章中位置
    let oppoColor = []
    let article = [
        { content: 'apppppp', type: 'trigger' },
        { content: 'appppp', type: 'plain' },
        { content: 'appppppp', type: 'plain' },
        { content: 'apppppppp', type: 'plain' },
        { content: 'appppppppp', type: 'reason' },
        { content: 'apppppppppp', type: 'result' },
    ]
    let truePosition = []
    article.forEach((cont, i) => {
        if (cont.type !== 'plain' && cont.type !== action[index]) {
            oppoColor.push({
                start: 0,
                length: cont.content.length,
                arrIndex: i,
                prop: cont.type
            })
        }
    })
    function formatPosition(start, arrIndex, length, prop, article) {
        let x = start,
            y = length
        let len = article.length
        for (let i = 0; i < arrIndex; i++) {
            x += article[i].content.length
        }
        y += x
        let position = { x, y, prop }
        return position
    }
    oppoColor.forEach(color => {
        let { start, length, arrIndex, prop } = color
        truePosition.push(formatPosition(start, arrIndex, length, prop, article))
    })
    truePosition.sort((a, b) => a.x - b.x)
    function findCurrentTruePosition(start, end, selected, article, prop) {
        // 算法是首位位置和start end以及对应的字符分别对应，如果长度也一致，那么基本判断位置确定
        let position = { start, prop }
        if (end - start === selected.length) {
            position.length = end - start
            position.arrIndex = article.findIndex(cont => cont.content.substr(start, end - start) === selected)
        } else {
            let currentLen = 0,
                flag = 0
            for (let i = 0; i < article.length; i++) {
                if (article[i].content[start] === selected[0]) {
                    currentLen = article[i].content.length - start
                    for (let j = i + 1; j < article.length; j++) {
                        if (article[j].content[end - 1] === selected[selected.length - 1]) {
                            currentLen += end
                            let { x } = formatPosition(start, i, currentLen, '', article)
                            if (copy.substr(x, currentLen) === selected) {
                                flag = 1
                                break
                            } else {
                                currentLen = currentLen - end + article[j].content.length
                            }
                        }
                    }
                    if (flag) {
                        position.arrIndex = i
                        break
                    }
                } else {
                    continue
                }
            }
            position.length = currentLen
        }
        return position
    }
    let currentColor = findCurrentTruePosition(0, 3, selected, article, action[index])
    let currentPosition = {}
    {
        let { start, length, arrIndex, prop } = currentColor
        currentPosition = (formatPosition(start, arrIndex, length, prop, article))
    }
    console.log(truePosition, currentPosition)
    let [{ x: x1, y: y1, prop: prop1 }, { x: x2, y: y2, prop: prop2 }] = truePosition
    let { x: cx, y: cy, prop: cprop} = currentPosition
    if (cy <= x1 || (cx >= y1 && cy <= x2) || cx >= y2) {
        console.log('没有交集')
    } else {
        console.log('有交集')
    }
}

pasted(0)