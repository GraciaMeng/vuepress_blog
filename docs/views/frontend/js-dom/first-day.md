---
title: js的dom记录1
date: 2021-5-22
categories:
  - javascript
tags:
  - js
publish: false
---

<!-- more -->

#### 10.事件三要素

事件是有三部分组成 :事件源 ,事件类型, 事件处理程序。

我们也称为事件三要素
(1) 事件源：事件被触发的对象，谁，按钮

(2) 事件类型 如何触发 什么事件 比如鼠标点击(onclick) 还是鼠标经过 还是键盘按下
(3) 事件处理程序 通过一个函数赋值的方式 完成

```js
var btn = document.getElementById("btn");
btn.onclick = function() {
  alert("点秋香");
};
```

#### 13.innerText 和 innerHTML 的区别

innerText 和 innerHTML 的区别

1. innerText 不识别 html 标签 非标准 去除空格和换行

2. innerHTML 识别 html 标签 W3C 标准 保留空格和换行的

```js
var div = document.querySelector("div");
div.innerHTML = "<strong>今天是：</strong> 2019";
// 这两个属性是可读写的  可以获取元素里面的内容
var p = document.querySelector("p");
console.log(p.innerText);
console.log(p.innerHTML);
```

#### 14.操作元素之修改元素属性

```js
// 修改元素属性  src
// 1. 获取元素
var ldh = document.getElementById("ldh");
var zxy = document.getElementById("zxy");
var img = document.querySelector("img");
// 2. 注册事件  处理程序
zxy.onclick = function() {
  img.src = "images/zxy.jpg";
  img.title = "张学友思密达";
};
ldh.onclick = function() {
  img.src = "images/ldh.jpg";
  img.title = "刘德华";
};
```

#### 16.操作元素之表单属性设置

```js
// 1. 获取元素
var btn = document.querySelector("button");
var input = document.querySelector("input");
// 2. 注册事件 处理程序
btn.onclick = function() {
  // input.innerHTML = '点击了';  这个是 普通盒子 比如 div 标签里面的内容
  // 表单里面的值 文字内容是通过 value 来修改的
  input.value = "被点击了";
  // 如果想要某个表单被禁用 不能再点击 disabled  我们想要这个按钮 button禁用
  // btn.disabled = true;
  this.disabled = true;
  // this 指向的是事件函数的调用者 btn
};
```

#### 18.操作元素之修改样式属性

```js
// 1. 获取元素
var div = document.querySelector("div");
// 2. 注册事件 处理程序
div.onclick = function() {
  // div.style里面的属性 采取驼峰命名法
  this.style.backgroundColor = "purple";
  this.style.width = "250px";
};
```

#### 22.通过 className 更改元素样式

```js
// 1. 使用 element.style 获得修改元素样式  如果样式比较少 或者 功能简单的情况下使用
var test = document.querySelector('div');
test.onclick = function() {
    // this.style.backgroundColor = 'purple';
    // this.style.color = '#fff';
    // this.style.fontSize = '25px';
    // this.style.marginTop = '100px';
    // 让我们当前元素的类名改为了 change

    // 2. 我们可以通过 修改元素的className更改元素的样式 适合于样式较多或者功能复杂的情况
    // 3. 如果想要保留原先的类名，我们可以这么做 多类名选择器
    // this.className = 'change';
    this.className = 'first change';
    // 追加样式
    this.className += ' change';
    /this.classList.add(" ");
}
```
