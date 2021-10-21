---
title: vue源码学习
date: 2021-10-9
categories:
  - vue
tags:
  - vue
publish: true
---

<!-- more -->

# 一.虚拟 dom

### react 的 dom diff 和 vue 的 dom diff 区别？

- vue1 没有虚拟 dom，不存在 diff 问题
- react15 的 dom diff 非常粗暴，递归
- vue2 引入 vdom，组件间响应式，组件内部用 dom diff

虚拟 dom 的关键就是老数据是一个数组，新数据也是一个数组

### vue2 做了什么(参考了 snabbdom，双端对比)？

old: 1 2 3 4 5

new: 1 4 2 6 5

react：正常遍历

vue2：oldStart newStart

- 开头对比
- 结尾对比
- 开头和结尾
- 结尾和开头
- 四次预判

vue3：双端+最长递增子序列

双端预判都没命中

old: 1 2 3 4 5 6

new: 13 2 4 6 4

用算法算出 new 中的最长递增子序列（old 的索引）

# 二.JSX 和 Template

react 中的 compiler： jsx=> render function => 返回 dom

vue 中的 compiler： template=>render function => 返回 vdom

### 1.jsx 优缺点

react 解决 dom 的方式：

既然 dom diff 会卡顿，dom diff 从树换成链表，diff 过程就可以中断。

老的 dom 结构

```json
{
  "tag": "div",
  "children": [子元素列表]
}
```

新的 dom 结构

```json
{
  "tag": "div",
  "child": 第一个子元素,
  "slibing": 兄弟元素,
  "return": 父元素
}
```

### 2.template 优缺点

### 3.代码实战和优化

### 4.尤其介绍静态优化
