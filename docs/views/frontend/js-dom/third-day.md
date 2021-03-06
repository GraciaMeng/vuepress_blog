---
title: js的dom记录3
date: 2021-5-22
categories:
  - javascript
tags:
  - js
publish: false
---

<!-- more -->

#### 1.节点操作之删除节点

```js
// 1.获取元素
var ul = document.querySelector("ul");
var btn = document.querySelector("button");
// 2. 删除元素  node.removeChild(child)
// ul.removeChild(ul.children[0]);
// 3. 点击按钮依次删除里面的孩子
btn.onclick = function() {
  if (ul.children.length == 0) {
    this.disabled = true;
  } else {
    ul.removeChild(ul.children[0]);
  }
};
```

#### 3.节点操作之克隆节点

```js
var ul = document.querySelector("ul");
// 1. node.cloneNode(); 括号为空或者里面是false 浅拷贝 只复制标签不复制里面的内容
// 2. node.cloneNode(true); 括号为true 深拷贝 复制标签复制里面的内容
var lili = ul.children[0].cloneNode(true);
ul.appendChild(lili);
```

#### 5.三种创建元素方式区别

```js
// 三种创建元素方式区别
// 1. document.write() 创建元素  如果页面文档流加载完毕，再调用这句话会导致页面重绘
// var btn = document.querySelector('button');
// btn.onclick = function() {
//     document.write('<div>123</div>');
// }

// 2. innerHTML 创建元素
var inner = document.querySelector(".inner");
// for (var i = 0; i <= 100; i++) {
//     inner.innerHTML += '<a href="#">百度</a>'
// }
var arr = [];
for (var i = 0; i <= 100; i++) {
  arr.push('<a href="#">百度</a>');
}
inner.innerHTML = arr.join("");
// 3. document.createElement() 创建元素
var create = document.querySelector(".create");
for (var i = 0; i <= 100; i++) {
  var a = document.createElement("a");
  create.appendChild(a);
}
```

#### 9.注册事件两种方式

```js
var btns = document.querySelectorAll("button");
// 1. 传统方式注册事件
btns[0].onclick = function() {
  alert("hi");
};
btns[0].onclick = function() {
  alert("hao a u");
};
// 2. 事件侦听注册事件 addEventListener
// (1) 里面的事件类型是字符串 必定加引号 而且不带on
// (2) 同一个元素 同一个事件可以添加多个侦听器（事件处理程序）
btns[1].addEventListener("click", function() {
  alert(22);
});
btns[1].addEventListener("click", function() {
  alert(33);
});
// 3. attachEvent ie9以前的版本支持
btns[2].attachEvent("onclick", function() {
  alert(11);
});
```

#### 10.删除事件

```js
var divs = document.querySelectorAll("div");
divs[0].onclick = function() {
  alert(11);
  // 1. 传统方式删除事件
  divs[0].onclick = null;
};
// 2. removeEventListener 删除事件
divs[1].addEventListener("click", fn); // 里面的fn 不需要调用加小括号

function fn() {
  alert(22);
  divs[1].removeEventListener("click", fn);
}
// 3. detachEvent
divs[2].attachEvent("onclick", fn1);

function fn1() {
  alert(33);
  divs[2].detachEvent("onclick", fn1);
}
```

#### 11.DOM 事件流三个阶段

```js
// dom 事件流 三个阶段
// 1. JS 代码中只能执行捕获或者冒泡其中的一个阶段。
// 2. onclick 和 attachEvent（ie） 只能得到冒泡阶段。
// 3. 捕获阶段 如果addEventListener 第三个参数是 true 那么则处于捕获阶段  document -> html -> body -> father -> son
// var son = document.querySelector('.son');
// son.addEventListener('click', function() {
//     alert('son');
// }, true);
// var father = document.querySelector('.father');
// father.addEventListener('click', function() {
//     alert('father');
// }, true);
// 4. 冒泡阶段 如果addEventListener 第三个参数是 false 或者 省略 那么则处于冒泡阶段  son -> father ->body -> html -> document
var son = document.querySelector(".son");
son.addEventListener(
  "click",
  function() {
    alert("son");
  },
  false
);
var father = document.querySelector(".father");
father.addEventListener(
  "click",
  function() {
    alert("father");
  },
  false
);
document.addEventListener("click", function() {
  alert("document");
});
```

#### 12.事件对象

```js
div.onclick = function(e) {
  // console.log(window.event);
  // e = e || window.event;
  console.log(e);
};
div.addEventListener("click", function(e) {
  console.log(e);
});
// 1. event 就是一个事件对象 写到我们侦听函数的 小括号里面 当形参来看
// 2. 事件对象只有有了事件才会存在，它是系统给我们自动创建的，不需要我们传递参数
// 3. 事件对象 是 我们事件的一系列相关数据的集合 跟事件相关的 比如鼠标点击里面就包含了鼠标的相关信息，鼠标坐标啊，如果是键盘事件里面就包含的键盘事件的信息 比如 判断用户按下了那个键
// 4. 这个事件对象我们可以自己命名 比如 event 、 evt、 e
// 5. 事件对象也有兼容性问题 ie678 通过 window.event 兼容性的写法  e = e || window.event;
```

#### 13.事件对象 e.target

```js
// 常见事件对象的属性和方法
// 1. e.target 返回的是触发事件的对象（元素）  this 返回的是绑定事件的对象（元素）
// 区别 ： e.target 点击了那个元素，就返回那个元素 this 那个元素绑定了这个点击事件，那么就返回谁
var div = document.querySelector("div");
div.addEventListener("click", function(e) {
  console.log(e.target);
  console.log(this);
});
var ul = document.querySelector("ul");
ul.addEventListener("click", function(e) {
  // 我们给ul 绑定了事件  那么this 就指向ul
  console.log(this);
  console.log(e.currentTarget);
  // e.target 指向我们点击的那个对象 谁触发了这个事件 我们点击的是li e.target 指向的就是li
  console.log(e.target);
});
// 了解兼容性
// div.onclick = function(e) {
//     e = e || window.event;
//     var target = e.target || e.srcElement;
//     console.log(target);

// }
// 2. 了解 跟 this 有个非常相似的属性 currentTarget  ie678不认识
```

#### 14.事件对象阻止默认行为

```js
// 常见事件对象的属性和方法
// 1. 返回事件类型
var div = document.querySelector("div");
div.addEventListener("click", fn);
div.addEventListener("mouseover", fn);
div.addEventListener("mouseout", fn);

function fn(e) {
  console.log(e.type);
}
// 2. 阻止默认行为（事件） 让链接不跳转 或者让提交按钮不提交
var a = document.querySelector("a");
a.addEventListener("click", function(e) {
  e.preventDefault(); //  dom 标准写法
});
// 3. 传统的注册方式
a.onclick = function(e) {
  // 普通浏览器 e.preventDefault();  方法
  // e.preventDefault();
  // 低版本浏览器 ie678  returnValue  属性
  // e.returnValue;
  // 我们可以利用return false 也能阻止默认行为 没有兼容性问题 特点： return 后面的代码不执行了， 而且只限于传统的注册方式
  return false;
  alert(11);
};
```

#### 15.阻止事件冒泡

```js
// 常见事件对象的属性和方法
// 阻止冒泡  dom 推荐的标准 stopPropagation()
var son = document.querySelector(".son");
son.addEventListener(
  "click",
  function(e) {
    alert("son");
    e.stopPropagation(); // stop 停止  Propagation 传播
    e.cancelBubble = true; // 非标准 cancel 取消 bubble 泡泡
  },
  false
);

var father = document.querySelector(".father");
father.addEventListener(
  "click",
  function() {
    alert("father");
  },
  false
);
document.addEventListener("click", function() {
  alert("document");
});
```

#### 16.事件委托

```js
// 事件委托的核心原理：给父节点添加侦听器， 利用事件冒泡影响每一个子节点
var ul = document.querySelector("ul");
ul.addEventListener("click", function(e) {
  // alert('知否知否，点我应有弹框在手！');
  // e.target 这个可以得到我们点击的对象
  e.target.style.backgroundColor = "pink";
});
```

#### 17.常见鼠标事件

```js
// 1. contextmenu 我们可以禁用右键菜单
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});
// 2. 禁止选中文字 selectstart
document.addEventListener("selectstart", function(e) {
  e.preventDefault();
});
```

#### 18.鼠标事件对象

```js
// 鼠标事件对象 MouseEvent
document.addEventListener("click", function(e) {
  // 1. client 鼠标在可视区的x和y坐标
  console.log(e.clientX);
  console.log(e.clientY);
  console.log("---------------------");

  // 2. page 鼠标在页面文档的x和y坐标
  console.log(e.pageX);
  console.log(e.pageY);
  console.log("---------------------");

  // 3. screen 鼠标在电脑屏幕的x和y坐标
  console.log(e.screenX);
  console.log(e.screenY);
});
```

#### 19.跟随鼠标的天使

```js
var pic = document.querySelector("img");
document.addEventListener("mousemove", function(e) {
  // 1. mousemove只要我们鼠标移动1px 就会触发这个事件
  // console.log(1);
  // 2.核心原理： 每次鼠标移动，我们都会获得最新的鼠标坐标， 把这个x和y坐标做为图片的top和left 值就可以移动图片
  var x = e.pageX;
  var y = e.pageY;
  console.log("x坐标是" + x, "y坐标是" + y);
  //3 . 千万不要忘记给left 和top 添加px 单位
  pic.style.left = x - 50 + "px";
  pic.style.top = y - 40 + "px";
});
```
