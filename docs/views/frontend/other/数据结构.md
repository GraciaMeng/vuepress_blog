---
title: JavaScript数据结构
date: 2021-8-30
categories:
  - 学习笔记
tags:
  - js
publish: true
---

<!-- more -->

# 一、栈

先进后出

### 1.实现栈

### 2.十进制转二进制（运用栈）

```js
function dec2bin(decNumber) {
  // 定义栈对象
  var stack = new Stack();
  while (decNumber > 0) {
    // 取余数，并且放入栈
    stack.push(decNumber % 2);
    // 获取整除后结果，作为下一次运行的数字
    decNumber = Math.floor(decNumber / 2);
  }
  // 从栈取0和1
  var binaryString = "";
  while (stack.size() !== 0) {
    binaryString += stack.pop();
  }
  return binaryString;
}
```

# 二、队列

先进先出

### 1.实现队列

```js
function Queue() {
  this.items = [];
  // 向队列尾部添加一个（或多个）新的项
  Queue.prototype.enqueue = function(...element) {
    this.items.push(...element);
  };
  // 移除队列的第一，并返回被移除的元素
  Queue.prototype.dequeue = function() {
    return this.items.shift();
  };
  // 返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何改动（不移除元素，只返回元素信息——与Stack类的peek方法非常类似）
  Queue.prototype.front = function() {
    return this.items[0];
  };
  // 如果队列中不包含任何元素，返回true，否则false
  Queue.prototype.isEmpty = function() {
    return this.items.length === 0;
  };
  // 返回队列包含的元素个数
  Queue.prototype.size = function() {
    return this.items.length;
  };
  // 将队列中内容转成字符串形式
  Queue.prototype.toString = function() {
    console.log(this.items);
    return this.items.join("");
  };
}
```

### 2.击鼓传花

```js
function passGame(nameList, num) {
  var queue = new Queue();
  queue.enqueue(...nameList);
  while (queue.size() > 1) {
    for (let i = 0; i < num - 1; i++) {
      queue.enqueue(queue.dequeue());
    }
    queue.dequeue();
  }
  return queue.front();
}
let nameList = ["11", "22", "33"];
console.log(passGame(nameList, 5));
```

# 三、优先级队列

### 1.实现

```js
function PriorityQueue() {
  this.items = [];

  function QueueElement(element, priority) {
    this.element = element;
    this.priority = priority;
  }
  // 向队列尾部添加一个（或多个）新的项
  PriorityQueue.prototype.enqueue = function(element, priority) {
    var queueElement = new QueueElement(element, priority);
    if (this.items.length === 0) {
      this.items.push(queueElement);
    } else {
      var flag = false;
      for (let i = 0; i < this.items.length; i++) {
        if (queueElement.priority < this.items[i].priority) {
          this.items.splice(i, 0, queueElement);
          flag = true;
          break;
        }
      }
      if (!flag) {
        this.items.push(queueElement);
      }
    }
  };
  // 移除队列的第一，并返回被移除的元素
  PriorityQueue.prototype.dequeue = function() {
    return this.items.shift();
  };
  // 返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何改动（不移除元素，只返回元素信息——与Stack类的peek方法非常类似）
  PriorityQueue.prototype.front = function() {
    return this.items[0];
  };
  // 如果队列中不包含任何元素，返回true，否则false
  PriorityQueue.prototype.isEmpty = function() {
    return this.items.length === 0;
  };
  // 返回队列包含的元素个数
  PriorityQueue.prototype.size = function() {
    return this.items.length;
  };
  // 将队列中内容转成字符串形式
  PriorityQueue.prototype.toString = function() {
    console.log(this.items);
    return this.items.join("");
  };
}
```

# 四、链表

### 1.实现链表

```js
function ListNode() {
  function Node(val) {
    this.val = val;
    this.node = null;
  }
  this.head = null;
  this.length = 0;
  // 向链表尾部添加一个新的项。
  ListNode.prototype.append = function(val) {
    // 创建新节点
    var newNode = new Node(val);

    // 判断是否添加的第一个节点
    if (this.length === 0) {
      this.head = newNode;
    } else {
      // 找到最后一个节点
      var current = this.head;
      while (current.next) {
        current = current.next;
      }
      // 最后节点指向新的节点
      current.next = newNode;
    }

    this.length++;
  };
  // 由于链表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString 方法，让其只输出元素的值。
  ListNode.prototype.toString = function() {
    var current = this.head;
    var listString = "";
    while (current) {
      listString += current.val;
      listString += " ";
      current = current.next;
    }
    return listString;
  };
  //  向链表的特定位置插入一个新的项。
  ListNode.prototype.insert = function(position, val) {
    // 对position进行越界判断
    if (position < 0 || position > this.length) return false;
    var newNode = new Node(val);
    // 判断插入位置是否第一个
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      var index = 0;
      var prev = null;
      var cur = this.head;
      while (index++ < position) {
        prev = cur;
        cur = cur.next;
      }
      newNode.next = cur;
      prev.next = newNode;
    }

    this.length += 1;
  };
  // 获取对应位置的元素。
  ListNode.prototype.get = function(position) {
    if (position < 0 || position >= this.length) return null;

    var current = this.head;
    var index = 0;
    while (index++ < position) {
      current = current.next;
    }
    return current.val;
  };
  // 返回元素在链表中的索引。如果链表中没有该元素就返回-1。
  ListNode.prototype.indexOf = function(val) {
    var current = this.head;
    var index = 0;
    while (current) {
      if (current.val === val) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  };
  // 修改某个位置的元素。
  ListNode.prototype.update = function(val, position) {
    if (position < 0 || position >= this.length) return null;
    var current = this.head;
    var index = 0;
    while (index++ < position) {
      current = current.next;
    }
    current.val = val;
    return true;
  };
  // 从链表的特定位置移除一项。
  ListNode.prototype.removeAt = function(position) {
    if (position < 0 || position >= this.length) return null;
    var current = this.head;
    var index = 0;
    var prev = null;
    while (index++ < position) {
      prev = current;
      current = current.next;
    }
    if (prev) {
      prev.next = current.next;
    } else {
      this.head = current.next;
    }
    this.length--;
    return current.val;
  };
  // 从链表中移除一项。
  ListNode.prototype.remove = function(val) {
    var position = this.indexOf(val);
    return this.removeAt(position);
  };
  // 如果链表中不包含任何元素，返回 trun，如果链表长度大于 0 则返回 false。
  ListNode.prototype.isEmpty = function() {
    return this.length === 0;
  };
  //  返回链表包含的元素个数，与数组的 length 属性类似。
  ListNode.prototype.size = function() {
    return this.length;
  };
}
```

# 五、双向链表

# 六、集合

# 七、哈希表

# 八、二叉树

### 1.实现二叉搜索树

```javascript
function BinarySearchTree() {
  function Node(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  this.root = null;
  // 向树中插入一个新的键。
  BinarySearchTree.prototype.insert = function(key) {
    // 根据key创建节点
    var node = new Node(key);
    // 判断根节点是否有值
    if (!this.root) {
      this.root = node;
    } else {
      this.insertNode(this.root, node);
    }
  };

  BinarySearchTree.prototype.insertNode = function(node, newNode) {
    if (newNode.key == node.key) {
      throw TypeError;
    }
    if (newNode.key < node.key) {
      //向左查找
      if (node.left == null) {
        node.left = newNode;
        return true;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      //向右查找
      if (node.right == null) {
        node.right = newNode;
        return true;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  };
  //  通过先序遍历方式遍历所有节点
  BinarySearchTree.prototype.preOrderTravelSal = function(handler) {
    this.preOrderTravelSalNode(this.node, handler);
  };
  BinarySearchTree.prototype.preOrderTravelSalNode = function(node, handler) {
    if (!node == null) {
      handler(node.key);
      this.preOrderTravelSalNode(node.left);
      this.preOrderTravelSalNode(node.right);
    }
  };
  // 通过中序遍历方式遍历所有节点
  BinarySearchTree.prototype.midOrderTravelSal = function(handler) {
    this.midOrderTravelSalNode(this.root, handler);
  };
  BinarySearchTree.prototype.midOrderTravelSalNode = function(node, handler) {
    if (!node === null) {
      this.midOrderTravelSalNode(node.left);
      handler(node.key);
      this.midOrderTravelSalNode(node.right);
    }
  };
  //  通过后序遍历方式遍历所有节点
  BinarySearchTree.prototype.postOrderTravelSal = function(handler) {
    this.postOrderTravelSalNode(this.root, handler);
  };
  BinarySearchTree.prototype.postOrderTravelSalNode = function(node, handler) {
    if (!node === null) {
      this.postOrderTravelSalNode(node.left, handler);
      this.postOrderTravelSalNode(node.right, handler);
      handler(node.key);
    }
  };
  // 返回树中最小的值/键
  BinarySearchTree.prototype.min = function() {
    let node = this.root;
    while (node.left !== null) {
      node = node.left;
    }
    return node.key;
  };
  // 返回树中最大的值/键
  BinarySearchTree.prototype.max = function() {
    let node = this.root;
    while (node.right) {
      node = node.right;
    }
    return node.key;
  };
  // 在树中查找一个键，如果节点存在，则返回 true；如果不存在，则返回 false
  BinarySearchTree.prototype.search = function(key) {
    let node = this.root;
    while (node) {
      if (node.key < key) {
        node = node.left;
      } else if (node.key > key) {
        node = node.right;
      } else {
        return true;
      }
    }
    return false;
  };
  // 从树中移除某个键
  BinarySearchTree.prototype.remove = function(key) {
    // 寻找要删除的节点
    let current = this.root,
      parent = null,
      isLeftNode = true;
    // 开始寻找节点
    while (current.key !== key) {
      parent = current;
      if (current.key < key) {
        current = current.left;
      } else {
        isLeftNode = false;
        current = current.right;
      }
      if (!current) return false;
    }

    // 根据对应情况删除节点
    // 1.删除的节点是叶子节点(没有子节点)
    if (!current.left && !current.right) {
      if (parent === this.root) {
        this.root = null;
      } else if (isLeftNode) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
    // 2.删除的节点只有左节点
    else if (current.right == null) {
      if (current == this.root) {
        this.root = current.left;
      } else if (isLeftNode) {
        parent.left = left;
      } else {
        parent.right = length;
      }
    } else if (current.left == null) {
      if (current == this.root) {
        this.root = current.left;
      } else if (isLeftNode) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    }
    // 3.删除的节点有左右两节点
    else {
      // 获取后继节点
      let successor = this.getSuccessor(current);
      // 判断是否根节点
      if (this.root === current) {
        this.root = successor;
        successor.left = current.left;
      } else if (isLeftNode) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }
      successor.left = current.left;
    }
    return true;
  };
  BinarySearchTree.prototype.getSuccessor = function(delNode) {
    // 定义变量存储临时节点
    let successParent = (successor = delNode),
      current = delNode.right;
    // 寻找节点
    while (current) {
      successParent = successor;
      successor = current;
      current = current.left;
    }
    // 如果后继节点不是删除节点的右节点
    if (successor != delNode.right) {
      successParent.left = successor.right;
      successor.right = delNode.right;
    }
    return successor;
  };
}

let str = "";
const handler = (key) => {
  str += key + " ";
};
```

# 九、图论

```js
function Graph() {
  // 属性：顶点（数组）/边（字典）
  this.vertexes = []; // 顶点
  this.edges = new Map(); // 边

  // 方法
  // 1.添加方法
  // 添加顶点方法
  Graph.prototype.addVertex = function(v) {
    this.vertexes.push(v);
    this.edges.set(v, []);
  };
  // 添加边方法
  Graph.prototype.addEdge = function(v1, v2) {
    if (!this.edges.has(v1) || !this.edges.has(v2)) {
      throw Error;
    }
    const v1List = this.edges.get(v1);
    v1List.push(v2);
    this.edges.set(v1, v1List);
    const v2List = this.edges.get(v2);
    v2List.push(v1);
    this.edges.set(v2, v2List);
  };

  Graph.prototype.toString = function() {
    // 定义字符串
    let resultString = "";
    // 遍历所有顶点，以及顶点对应的边
    for (let i = 0; i < this.vertexes.length; i++) {
      resultString += this.vertexes[i] + "->";
      const arr = this.edges.get(this.vertexes[i]);
      for (let j = 0; j < arr.length; j++) {
        resultString += arr[j] + " ";
      }
      resultString += "\n";
    }
    return resultString;
  };

  // 初始化颜色
  Graph.prototype.initializeColor = function() {
    const colors = [];
    for (let i = 0; i < this.vertexes.length; i++) {
      colors[this.vertexes[i]] = "white";
    }
    return colors;
  };

  // 实现广度优先搜索（BFS）
  Graph.prototype.bfs = function(initV, handler) {
    // 初始化颜色
    const colors = this.initializeColor();
    // 创建队列
    const queue = new Queue();

    // 将顶点加入到队列种
    queue.enqueue(initV);

    // 循环从队列取出元素
    while (!queue.isEmpty()) {
      // 从队列种取出一个顶点
      let v = queue.dequeue();

      // 获取和顶点相连的另外两个顶点
      let vList = this.edges.get(v);

      // 将v的颜色设置灰色
      colors[v] = "gray";

      // 遍历所有的顶点，并加入到队列种
      for (let i = 0; i < vList.length; i++) {
        // 相邻顶点
        let e = vList[i];
        if (colors[e] == "white") {
          colors[e] = "gray";
          queue.enqueue(e);
        }
      }

      // 访问顶点
      handler(v);

      // 将顶点设置黑色
      colors[v] = "black";
    }
  };

  // 实现深度优先搜索（DFS）
  Graph.prototype.dfs = function(initV, handler) {
    // 初始化颜色
    const colors = this.initializeColor();

    // 从某个顶点依次递归访问
    this.dfsVisit(initV, colors, handler);
  };
  Graph.prototype.dfsVisit = function(v, colors, handler) {
    // 将颜色设置为灰色
    colors[v] = "gray";
    // 处理v顶点
    handler(v);
    // 访问v相连的顶点
    const vList = this.edges.get(v);
    for (let i = 0; i < vList.length; i++) {
      let e = vList[i];
      if (colors[e] == "white") {
        this.dfsVisit(e, colors, handler);
      }
    }
    // 将v设置为黑色
    colors[v] = "black";
  };
}
const g = new Graph();
const vertexes = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
for (let i = 0; i < vertexes.length; i++) {
  g.addVertex(vertexes[i]);
}
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("A", "D");
g.addEdge("C", "D");
g.addEdge("C", "G");
g.addEdge("D", "G");
g.addEdge("D", "H");
g.addEdge("B", "E");
g.addEdge("B", "F");
g.addEdge("E", "I");
alert(g.toString());

let str = "";
g.bfs(g.vertexes[0], function(v) {
  str += v + "";
});
```
