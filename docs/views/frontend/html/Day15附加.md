---
title: Day15附加
date: 2020-6-20
categories:
 - html
 - css
tags:
 - html
 - css
publish: true
---

<!-- more -->

# 内容概述

## 一、网络字体

- @font-face可以让网页支持网络字体（Web Font），不再局限于系统自带的字体
- 字体下载：https://fonts.google.com/
- 常见的字体种类
  - TrueType字体：扩展名时.ttf
  - OpenType字体：扩展名是.ttf、.otf，建立在TrueType字体之上

## 二、关键帧动画

关键帧动画使用@keyframes来定义多个变化状态，并且使用animation-name来声明匹配

- 1.实验@keyframes创建一个规则
- 2.@keyframes中使用百分比定义各个阶段的样式
- 3.通过animation将动画添加到属性

### animation

- animation-name：指定执行哪一个关键帧动画
- animation-duration：指定动画的持续时间
- animation-timing-function：指定动画的变化曲线
- animation-delay：指定延迟执行的时间
- animation-iteration-count：指定动画执行的次数，执行onfinite表示无限动画
- animation-direction：指定方向，常用值normal和reverse
- animation-fill-mode：执行动画最后保留哪一个值
  - none：回到没有执行动画的位置
  - forwards：动画最后一帧的位置
  - backwards：动画第一帧的位置
- animation-play-state：指定动画运行或者暂停（在js使用，用于暂停动画）

### text-overflow

- white-space用于设置空白处理和换行规则

  - normal：合并所以连续的空白，允许单词超屏时自动换行
  - nowrap：合并所有连续的空白，不允许单词超屏时自动换行

- text-overflow通常用来设置文字溢出时的行为（处理那部分不可见的内容）

  - clip：溢出的内容直接裁剪带（字符可能会显示不完整）
  - ellipsis：溢出那行的结尾处用省略号表示

- text-overflow生效的前提是overflow不为visible

- 显示一行文本并且显示省略号的方法

- ```css
  {
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis
  }
  ```

  