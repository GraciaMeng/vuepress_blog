---
title: js面试题记录
date: 2021-7-15
categories:
  - 学习笔记
tags:
  - js
publish: false
---

<!-- more -->

# 1.LRU 算法

```js
LRUCache cache = new LRUCache( 2 /* 缓存容量 */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4
```

## 一般解法

```js
var LRUCache = function(capacity) {
  this.capacity = capacity;
  this.cache = [];
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  let index = this.cache.findIndex((item) => item.key === key);
  if (index === -1) {
    return -1;
  }
  // 删除此元素后插入到数组第一项
  let value = this.cache[index].value;
  this.cache.splice(index, 1);
  this.cache.unshift({
    key,
    value,
  });
  return value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  let index = this.cache.findIndex((item) => item.key === key);
  // 想要插入的数据已经存在了，那么直接提升它就可以
  if (index > -1) {
    this.cache.splice(index, 1);
  } else if (this.cache.length >= this.capacity) {
    // 若已经到达最大限制，先淘汰一个最久没有使用的
    this.cache.pop();
  }
  this.cache.unshift({ key, value });
};
```

## 高阶解法

```js
var LRUCache = function(capacity) {
  this.cache = new Map();
  this.capacity = capacity;
};

LRUCache.prototype.get = function(key) {
  if (this.cache.has(key)) {
    // 存在即更新
    let temp = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, temp);
    return temp;
  }
  return -1;
};

LRUCache.prototype.put = function(key, value) {
  if (this.cache.has(key)) {
    // 存在即更新（删除后加入）
    this.cache.delete(key);
  } else if (this.cache.size >= this.capacity) {
    // 不存在即加入
    // 缓存超过最大值，则移除最近没有使用的
    this.cache.delete(this.cache.keys().next().value);
  }
  this.cache.set(key, value);
};
```

# 2.实现一个 compose 函数

compose 与 pipe 函数区别

compose 是从右往左，用的是 reduceRight 函数

pipe 是从左往右，用的是 reduce 函数

```js
//compose的作用就是将嵌套执行的方法作为参数平铺，嵌套执行的时候，里面的方法也就是右边的方法最开始执行，然后往左边返回，
// 参数从右往左执行，所以multiply在前，add在后
let res = compose(multiply, add)(10);
```

一般实现

```js
const compose = function() {
  // 将接收的参数存到一个数组， args == [multiply, add]
  const args = [].slice.apply(arguments);
  return function(x) {
    return args.reduceRight((res, cb) => cb(res), x);
  };
};

// 我们来验证下这个方法
let calculate = compose(multiply, add);
let res = calculate(10);
console.log(res); // 结果还是200
```

ES6 实现

```js
const compose = (...args) => (x) => args.reduceRight((res, cb) => cb(res), x);
```
