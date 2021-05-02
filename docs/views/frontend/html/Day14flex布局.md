---
title: Day14flex布局
date: 2020-6-5
categories:
 - flex
 - css
tags:
 - flex
 - css
publish: true
---

<!-- more -->

# flex布局

flex-container：

- display：flex/inline-flex
  - 开启flex布局
- flex-direction
  - 决定主轴的方向
  - row：主轴从左到右
  - row-reverse：主轴从右到左
  - column：主轴从上到下
  - column：主轴从下到上
- justify-content
  - 决定主轴上flex-items如何排布
  - flex-start（默认值）：与main start对齐
  - flex-end：与mian end对齐
  - center：居中对齐
  - space-between：
    - flex items之间的距离相等
    - 与main start 、main end两端对齐
  - space-evenly：
    - flex items 之间的距离相等
    - flex items 与main start 、main end之间的距离等于flex items之间的距离
  - space-around：
    - flex items之间的距离相等
    - flex items 与main start、main end之间的距离等于flex items之间距离的一半
- align-items
  - 决定flex-items在交叉轴上的对齐方式
  - normal：在弹性布局中，效果和stretch一样
  - stretch：当flex items在cross axis方向的size为auto时，会自动拉伸至填充flex container
  - flex-start：与cross start对齐
  - flex-end：与cross end对齐
  - center：居中对齐
  - baseline：与基准线对齐
- flex-warp
  - nowrap（默认）：单行
  - wrap：多行
  - wrap-reverse：多行（对比wrap，cross start和cross end相反
- flex-flow
  - flex-direction
  - flex-wrap
- align-content
  - 决定多行的flex-items在交叉轴上的对齐方式

### flex-items

- order
  - 决定flex items的排布顺序
  - 可以设置任意整数（正整数、负整数、0）值越小就越排在后面
  - 默认值是0
- align-self
  - flex items可以通过align-self覆盖flex container设置的align-items
  - auto（默认值）：遵从flex container的align-items设置
  - 效果跟align-items一致
- flex-grow决定flex items如何扩展
  - 可以设置任意非负数字（正小数，正整数，0）默认是0
  - 当flex container在main axis方向上有剩余size时，flex-grow属性才会有效
  - 如果所有flex items的flex-grow总和sum超过1，每个flex item扩展的size为
    - flex container的剩余size*flex-grow/sum
  - 如果所有flex items的flex-grow总和sum不超过1，每个flex item扩展的size为
    - flex container的剩余size*flex-grow
- flex-shrink决定flex items如何收缩
- flex-basis
  - 用来设置flex items在main axis方向上的base size
  - auto默认值 具体的宽度数值
- flex
  - flex-grow||flex-shrink||flex-basis的缩写属性
  - 单值语法：值必须为以下其中之一
    - 一个无单位数（<number>）：会被当做<flex-grow>
    - 一个有效的宽度（width）值：会被当做<flex-basis>
    - 关键字none，auto或initial
  - 双值语法：第一个值必须为一个无单位数，并且他会被当作<flex-grow>
    - 第二个值必须为以下之一：
      - 一个无单位数：会被当做<flex-shrink>
      - 一个有效的宽度值：会被当做<flex-basis>
  - 三值语法：
    - 第一个无单位数：会被当做<flex-grow>
    - 第二个无单位数：会被当做<flex-shrink>
    - 第三个有效的宽度值：会被当做<flex-basis>

