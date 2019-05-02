// 通用的发布者对象和包装器
var publisher = {
  subscribers: {
    any: []
  },
  on(fn, type, context) {
    type = type || 'any'
    fn = typeof fn === 'function' ? fn : context[fn]
    if (typeof this.subscribes[type] === 'undefined') {
      this.subscribers[type] = []
    }
    this.subscribers[type].push({ fn: fn, context: context || this })
  },
  remove(fn, type) {
    this.visitSubscribers('unsubscribe', fn, type, context)
  },
  fire(type, publication) {
    this.visitSubscribers('public', type, publication)
  },
  visitSubscribers(action, type, arg, context) {
    var pubtype = type || 'any',
      subscribers = this.subscribers[pubtype],
      i,
      max = subscribers ? subscribers.length : 0
    for (i = 0; i < max; i++) {
      if (action === 'publish') {
        subscribers[i].fn.call(subscibers[i].context, arg)
      } else {
        if (subscribers[i] === arg) {
          subscribers.splice(i, 1)
        }
      }
    }
  }
}
function makePublisher(o) {
  var i
  for (i in publisher) {
    if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
      o[i] = publisher[i]
    }
  }
  o.subscribers = { any: [] }
}
// 事件发布者
function Player(name, key) {
  this.points = 0
  this.name = name
  this.key = key
  this.fire('newPlayer', this)
}
Player.prototype.play = function() {
  this.points += 1
  this.fire('play', this)
}

var game = {
  keys: {},
  addPlayer: function(player) {
    var key = player.key.toString().charCodeAt(0)
    this.keys[key] = player
  },
  handleKeypress: function(e) {
    e = e || window.event
    if (game.keys[e.which]) {
      game.keys[e.which].play()
    }
  },
  handlePlay: function(player) {
    var i,
      players = this.keys,
      score = {}
    for (i in players) {
      if (players.hasOwnProperty(i)) {
        score[players[i].name] = players[i].points
      }
    }
    this.fire('scorechange', score)
  }
}

// 事件包装
makePublisher(Play.prototype)
makePublisher(game)
// 事件绑定
Player.prototype.on('newPlayer', 'addPlayer', game)
Player.prototype.on('play', 'handlePlay', game)
game.on('scorechange', scoreboard.update, scoreboard)
window.onkeypress = game.handleKeypress

// 捋一下流程
/* 1. 按下按键触发根据 key 触发对应的 player.play()
 * 2. play 方法注册在 game 对象, 修改 points, 触发 scorechange 事件
 * 3. scoreboard 修改 dom 中对应元素
 */
