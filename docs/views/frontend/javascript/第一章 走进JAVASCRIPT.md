---
title: 第一章 走进JAVASCRIPT
date: 2021-4-23
categories:
 - javascript
tags:
 - javascript
publish: true
---

<!-- more -->

##### 15.冻结const变量，就不会被修改

```javascript
const HOST = {
	url:'http://www.meng.com',
	port:80
}
Object.freeze(HOST)
```

##### 16.标量与引用类型的传值和传址特性

```javascript
let a = 1;
let b = a;
#不会改变
let e = {};
let f = e;
#里面的内容会共同改变，因为都是同一个内存地址
```

##### 17.null与undefined

函数传值和函数返回值为空时都是undefined

##### 18."use strict"严格模式

向下查找==局部开启严格模式

##### 27.switch可以这么用

```javascript
let message = '';
switch (message) {
    case 'info':
    case 'success':
        console.log('info and success');
        break
    default:
        break;
}
```

