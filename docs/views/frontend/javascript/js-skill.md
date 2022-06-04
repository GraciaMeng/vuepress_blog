---
title: js面试题
date: 2021-4-23
categories:
 - 未完成
tags:
 - 未完成
publish: false
---

<!-- more -->

## 1.获取URL参数并转换为对象

```js
function getQueryParams(){
    const result = {};
    const querystring = window.location.search;
    const reg = /[?&][^?&]+=[^?&]]+/g;
    const found = querystring.match(reg);
    if(!found) return {};
    found.forEach(item=>{
        let temp = item.substring(1).split('=');
        result[temp[0]] = temp[1];
    })
    return found
}
```

## 2.封装storage的存取

```js
const namespace = 'mall'
function saveItem(key, value){
    let storage = window.localStorage.getItem(namespace);
    if(!storage){
        storage = {};
    }else {
        storage = JSON.parse(storage);
    }
    storage[key] = value;
    window.localStorage.setItem(namespace,JSON.stringify(storage));
}
function loadItem(key, def){
    let storage = window.localStorage.getItem(namespace);
    if(!storage){
        return def;
    }
    storage = JSON.parse(storage);
    let result = storage[key];
    return result || def;
}
```

## 3.动态添加类名

```js
function addClass(el, classname){
    // 判断添加的类名是否已经存在
	if(_hasClass(el,className)) return;
    // 真正的添加类名
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.classname = newClass.join(' ');
}
function _hasClass(el, classname){
    const reg = new RegExp('(^|\\s)' + classnam + '(\\s|$)');
    return reg.test(el.classname);
}
```

