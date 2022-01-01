---
title: 防抖和节流
date: 2021-7-15
categories:
  - 学习笔记
tags:
  - js
publish: true
---

<!-- more -->

# 1.防抖

## （1）概念描述

- ### 什么是防抖？

  - 在一个任务被频繁触发的情况下，只有当任务触发的间隔超过指定间隔的时候，该任务才会执行
  - 也就是说在持续触发事件时，防抖会合并事件且不会触发事件，当一定时间没有触发事件时，才会真正触发事件。

- ### 考察点？

  - 闭包的使用

- ### 解决什么问题？

  - 在前端开发的过程中，我们经常会需要绑定一些持续触发的事件，如 resize、scroll、mousemove。。。，但有些时候我们并不希望在事件持续触发的过程中那么频繁地去执行函数。
  - 一般来说，防抖是比较好的解决方案。

- ### 场景复现？

  - 网站头部的输入框，输入之后会调用接口，获取联想词。但是，因为频繁调用接口不太好，所以我们在代码中使用防抖功能，只有在用户输入完毕的一段时间后，才会调用接口，出现联想词。

## （2）代码实现

##### 1.非立即执行版

非立即执行版的意思是触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。

```js
function debounce(delay, callback) {
  let timer;
  return function(value) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback && callback(value);
    }, delay);
  };
}
function logValue(value) {
  console.log(value);
}
let input = document.getElementId("debounce");
let debounceInput = debounce(1000, logValue);
input.addEventListener("keyup", function(e) {
  debounceInput(e.target.value);
});
```

##### 2.立即执行版

立即执行版的意思是触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。

```js
const debounce = (func, wait, ...args) => {
  let timeout;
  return function(){
    const context = this;
    if (timeout) cleatTimeout(timeout);
    let callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    },wait)
    
    if(callNow) func.apply(context,args)
   }
}
```

##### 3.结合版

```js
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func,wait,immediate) {
    var timeout;

    return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}
```



# 2.节流

## （1）概念描述

- ### 什么是节流？

  - 规定再一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

- ### 考察点？

  - 闭包的使用

- ### 解决什么问题？

  - 用户点击提交按钮，假设在我们知道接口大致的返回时间的情况下，我们使用节流，只允许一定时间内点击一次。
  - 懒加载要监听计算滚动的位置，使用节流按一定时间的频类获取

## （2）代码实现

##### 1.定时器版

```js
function throttle(delay, callback) {
  let timer = null;
  return function() {
    if (!timer) {
      timer = setTimeout(() => {
        callback && callback();
        timer = null;
      }, delay);
    }
  };
}
function logValue() {
  console.log(a);
}
let input = document.getElementById("throttle");
let throttleInput = throttle(1000, logValue);
input.addEventListener("keyup", function(e) {
  throttleInput(e.target.value);
});
```

##### 2.时间戳版

```js
function throttle(fn, wait, ..args) {
    let pre = 0;
    return function () {
        const context = this;
        let now = Date.now();
        if(now - pre >) {
            fn.apply(this, args);
            pre = Date.now();
        }
    }
}
```



## （3）总结

- 函数防抖和函数节流都是防止某一时间频繁触发，但两者的原理却不一样
- 函数防抖是某一段时间内只执行一次，而函数节流是间隔时间执行。
