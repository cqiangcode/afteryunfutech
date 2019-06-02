// 树的双亲孩子表示法

/* order data parent firstKid     data  nextSlibing        data  nextSlibing
 * 0      A    -1     .    --->    1        .   ------->    2        ^
 * 1      B     0     .    --->    3        ^
 * 2      C     0     ^
 * 3      D     1     ^ 
 */
function Node (value, parent, firstKid) {
  this.value = value;
  this.parent = parent;
  this.firstKid = firstKid || null;
}

function son (nodeId, next) {
  this.nodeId = nodeId;
  this.next = next;
}

function generateTree () {
  var nodeList = [];
}