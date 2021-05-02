---
title: Day6表单、元素类型
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

## 一、表单元素

- select - option
- 简介：textarea
- input的其他属性：
  - maxlength允许输入的最大字数
  - placeholder 输入框的占位文字（新增）
  - readonly只读
  - disabled禁用
  - checked默认被选中
    - type为radio和checkbox
  - autofocus当页面加载时，自动聚焦
  - name名字
  - value取值
  - multiple（新增）多个值
  - autofocus（新增）最多输入的内容
  - type （新增）
    - date
    - time
    - tel
    - number
    - color
    - email
- button的实现方式：
  - input
  - button
- input和label结合使用
- 去除input的outline
  - outline：none
  - tabindex = -1
- textarea属性
  - cols
  - rows
  - resize 禁止缩放（css设置）：none
- select和option
  - multiple多选
  - size显示多少项
  - selected
- form
  - action
  - method
  - target
    - get
    - post
  - enctype - > 文件上传multipart/form-data
  - accept-charset

## 二、元素类型

- 显示类型
  - 块级元素
  - 行内级元素
- 内容类型
  - 替换元素-行内级元素
  - 非替换元素
- display
  - block 让元素显示为块级元素 （独占一整行）
  - inline 让元素显示为行内级元素
  - none隐藏元素
  - inline-block让元素同时具备行内级、块级元素的特征
    - 可以和其他元素在同一行显示
    - 可以设置宽高
- 邮箱练习

