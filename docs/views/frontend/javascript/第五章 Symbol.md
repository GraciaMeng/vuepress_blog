---
title: 第五章 Symbol
date: 2021-5-2
categories:
 - javascript
tags:
 - javascript
publish: true
---

<!-- more -->

##### 1.声明定义Symbol

```javascript
let hd = Symbol("meng");
let edu = Symbol("du");
console.log(hd == edu);  // false
console.log(hd.description); // "meng"
```

```javascript
//全局引用的Symbol都是同一个
let hd = Symbol.for("meng");
let edu = Symbol.for("meng");
console.log(hd == edu); // true
console.log(Symbol.keyFor())
```

##### 2.解决字符串耦合

```javascript
let stu1 = {
    name:'meng',
    key:Symbol()
}
let stu2 = {
    name:'meng',
    key:Symbol()
}
let grade = {
    [stu1.key]:{js:100,css:100},
    [stu2.key]:{js:99,css:99}
}
```

##### 3.在缓存容易的使用

```javascript
class Cache {
    static state = {}
    static set(name,value){
        return (this.state[name] = value)
    }
    static get(name) {
        return this.data[name]
    }
}
let user = {
    name:'apple',
    desc:'user',
    key:Symbol('user')
}
let cart = {
    name:'apple',
    desc:'cart',
    key:Symbol('cart')
}
Cache.set(user.key,user);
Cache.set(cart.key,cart);
console.log(Cache.get(user.key))
```

