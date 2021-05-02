---
title: Day4伪元素和emmet语法
date: 2020-4-26
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

# 一、伪类和伪元素

### 1.1伪类

- target：目标伪类
- 元素状态伪类：disabled/enabled/checked（input）
- 动态伪类：
- - link：a
  - visited：a
  - focus：a和input
  - hover其他元素
  - active其他元素
- 结构伪类
  - nth-child
    - 选择资源中的第几个
    - 数字
    - n ->2n + 3 ->-n + 3
  - nth-last-child
    - 从后向前数
  - nth-of-type
    - 相同类型
    - 如果类型不同，忽略
  - nth-last-of-type
    - 从后向前数
  - first-child
  - last-child
  - first-of-type
  - last-of-type
  - only-child
  - empty
  - root
- 否定伪类
  - 特殊场景下用否定伪类
  - class不香吗

### 1.2伪元素

- first-line
- first-letter
- before
- after
- 建议：使用两个冒号

# 二、Emmet语法

- !和html:5
- 大于号>和+
- *和^和()
- 属性id/class/普通
- 内容{}
- $
- 隐形标签div ul>.item table>.row>.content
- css emmet语法

# 三、css的特性

child：孩子

children：孩子们

# 快捷键

- alt+shift+f：代码格式化