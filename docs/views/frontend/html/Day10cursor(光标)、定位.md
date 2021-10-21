---
title: Day10cursor(光标)、定位
date: 2020-6-6
categories:
  - css
tags:
  - css
---

<!-- more -->

# 内容概述

## 一、cursor（光标）

- ​ 设置鼠标指针在元素上面时的显示样式

- auto
- default 小箭头
- pointer 小手儿
- text 一条竖线
- none 没用任何指针

## 二、定位

- 标准流 normal flow
- static:静态定位
- relative：相对定位
  - 图片居中
- absolute 绝对定位
- fixed 固定定位
- 绝对定位技巧
  - 绝对定位元素 position 值为 absolute 或者 fixed 的元素
  - 定位参照对象宽度=left+right+margin-left+margin-right+绝对定位元素的实际占用宽度
  - 定位参照对象高度=top+bottom+margin-top+margin-bottom+绝对定位元素的实际占用高度
- 元素层叠关系
  - ![image-20200606222546509](C:\Users\MengJiaXi\AppData\Roaming\Typora\typora-user-images\image-20200606222546509.png)
