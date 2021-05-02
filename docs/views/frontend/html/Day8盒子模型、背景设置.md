---
title: Day8盒子模型、背景设置
date: 2020-5-16
categories:
 - css
tags:
 - css
publish: true
---

<!-- more -->

# 内容概述

## 一、盒子模型

- outline
  - width，style，color
  - input/a/textarea
  - 调试网站
- box-shadow 阴影
  - inset？&&<length>{2,4}&&<color>
  - 第一个length：水平方向的偏移，正数往右偏移
  - 第二个length：垂直方向的偏移，正数往下偏移
  - 第三个length：模糊半径（blur radius
  - 第四个length：延申距离
  - inset：外框阴影变成内框阴影
  - 可以以逗号分隔，左右两边都可以弄
- text-shadow
  - <length>{2,3}&&<color>
- box-sizing设置盒子模型中宽高的行为
  - content-box内容宽高
  - border-box内容+内边距+边框的宽度
- 居中的总结
- margin原理

## 二、背景设置

- background-image
- background-repeat平铺
  - repeat
  - repeat-x
  - repeat-y
  - no-repeat
- background-size设置背景图片大小
  - auto
  - cover对背景图片拉伸，以完全覆盖铺满元素
  - contain缩放背景图，宽度或者高度铺满元素，但是图片保持宽高比
- background-position设置背景图片在水平、垂直方向
- CSS Sprite 是css图像合成技术，将各种小图片合并到一张图片上，然后利用css的背景定位来显示对应的图片部分
- background-attachment
  - scroll：背景图片跟随元素一起滚动（默认值）
  - local：背景图片跟随元素以及元素内容一起滚动
  - fixed：背景图片相对于浏览器窗口固定
- background
- image position/size repeat attachment color

