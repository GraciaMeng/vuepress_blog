---
title: js的dom记录2
date: 2021-5-22
categories:
  - javascript
tags:
  - js
publish: false
---

<!-- more -->

#### 1.排他思想算法

```js
// 1. 获取所有按钮元素
var btns = document.getElementsByTagName("button");
// btns得到的是伪数组  里面的每一个元素 btns[i]
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function() {
    // (1) 我们先把所有的按钮背景颜色去掉  干掉所有人
    for (var i = 0; i < btns.length; i++) {
      btns[i].style.backgroundColor = "";
    }
    // (2) 然后才让当前的元素背景颜色为pink 留下我自己
    this.style.backgroundColor = "pink";
  };
}
//2. 首先先排除其他人，然后才设置自己的样式 这种排除其他人的思想我们成为排他思想
```

#### 5.自定义属性操作

```js
<div id="demo" index="1" class="nav"></div>
<script>
    var div = document.querySelector('div');
    // 1. 获取元素的属性值
    // (1) element.属性
    console.log(div.id);
    //(2) element.getAttribute('属性')
	//get得到获取 attribute 属性的意思 我们程序员自己添加的属性我们称为自定义属性 index
    console.log(div.getAttribute('id'));
    console.log(div.getAttribute('index'));
    // 2. 设置元素属性值
    // (1) element.属性= '值'
    div.id = 'test';
    div.className = 'navs';
    // (2) element.setAttribute('属性', '值');  主要针对于自定义属性
    div.setAttribute('index', 2);
    div.setAttribute('class', 'footer'); // class 特殊  这里面写的就是class 不是className
    // 3 移除属性 removeAttribute(属性)
    div.removeAttribute('index');
</script>
```

#### 7.H5 自定义属性

```js
<div getTime="20" data-index="2" data-list-name="andy"></div>
<script>
    var div = document.querySelector('div');
    // console.log(div.getTime);
    console.log(div.getAttribute('getTime'));
    div.setAttribute('data-time', 20);
    console.log(div.getAttribute('data-index'));
    console.log(div.getAttribute('data-list-name'));
    // h5新增的获取自定义属性的方法 它只能获取data-开头的
    // dataset 是一个集合里面存放了所有以data开头的自定义属性
    console.log(div.dataset);
    console.log(div.dataset.index);
    console.log(div.dataset['index']);
    // 如果自定义属性里面有多个-链接的单词，我们获取的时候采取 驼峰命名法
    console.log(div.dataset.listName);
    console.log(div.dataset['listName']);
</script>
```

#### 9.父节点操作

```js
// 1. 父节点 parentNode
var erweima = document.querySelector(".erweima");
// var box = document.querySelector('.box');
// 得到的是离元素最近的父级节点(亲爸爸) 如果找不到父节点就返回为 null
console.log(erweima.parentNode);
```

#### 10.子节点操作

回车也是一个文本节点

```js
// DOM 提供的方法（API）获取
var ul = document.querySelector("ul");
var lis = ul.querySelectorAll("li");
// 1. 子节点  childNodes 所有的子节点 包含 元素节点 文本节点等等
console.log(ul.childNodes);
console.log(ul.childNodes[0].nodeType);
console.log(ul.childNodes[1].nodeType);
// 2. children 获取所有的子元素节点 也是我们实际开发常用的
console.log(ul.children);
```

#### 11.子节点-第一个子元素和最后一个子元素

```js
var ol = document.querySelector("ol");
// 1. firstChild 第一个子节点 不管是文本节点还是元素节点
console.log(ol.firstChild);
console.log(ol.lastChild);
// 2. firstElementChild 返回第一个子元素节点 ie9才支持
console.log(ol.firstElementChild);
console.log(ol.lastElementChild);
// 3. 实际开发的写法  既没有兼容性问题又返回第一个子元素
console.log(ol.children[0]);
console.log(ol.children[ol.children.length - 1]);
```

#### 12.兄弟节点

```js
var div = document.querySelector("div");
// 1.nextSibling 下一个兄弟节点 包含元素节点或者 文本节点等等
console.log(div.nextSibling);
console.log(div.previousSibling);
// 2. nextElementSibling 得到下一个兄弟元素节点
console.log(div.nextElementSibling);
console.log(div.previousElementSibling);
```

#### 13.创建和添加节点

```js
// 1. 创建节点元素节点
var li = document.createElement("li");
// 2. 添加节点 node.appendChild(child)  node 父级  child 是子级 后面追加元素  类似于数组中的push
// 将一个节点添加到指定
var ul = document.querySelector("ul");
ul.appendChild(li);
// 3. 添加节点 node.insertBefore(child, 指定元素);
var lili = document.createElement("li");
ul.insertBefore(lili, ul.children[0]);
// 4. 我们想要页面添加一个新的元素 ： 1. 创建元素 2. 添加元素
```
