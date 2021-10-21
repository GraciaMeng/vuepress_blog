---
title: Day14flex布局
date: 2020-6-5
categories:
  - flex
  - css
tags:
  - flex
  - css
---

<!-- more -->

# flex 布局

flex-container：

- display：flex/inline-flex
  - 开启 flex 布局
- flex-direction
  - 决定主轴的方向
  - row：主轴从左到右
  - row-reverse：主轴从右到左
  - column：主轴从上到下
  - column：主轴从下到上
- justify-content
  - 决定主轴上 flex-items 如何排布
  - flex-start（默认值）：与 main start 对齐
  - flex-end：与 mian end 对齐
  - center：居中对齐
  - space-between：
    - flex items 之间的距离相等
    - 与 main start 、main end 两端对齐
  - space-evenly：
    - flex items 之间的距离相等
    - flex items 与 main start 、main end 之间的距离等于 flex items 之间的距离
  - space-around：
    - flex items 之间的距离相等
    - flex items 与 main start、main end 之间的距离等于 flex items 之间距离的一半
- align-items
  - 决定 flex-items 在交叉轴上的对齐方式
  - normal：在弹性布局中，效果和 stretch 一样
  - stretch：当 flex items 在 cross axis 方向的 size 为 auto 时，会自动拉伸至填充 flex container
  - flex-start：与 cross start 对齐
  - flex-end：与 cross end 对齐
  - center：居中对齐
  - baseline：与基准线对齐
- flex-warp
  - nowrap（默认）：单行
  - wrap：多行
  - wrap-reverse：多行（对比 wrap，cross start 和 cross end 相反
- flex-flow
  - flex-direction
  - flex-wrap
- align-content
  - 决定多行的 flex-items 在交叉轴上的对齐方式

### flex-items

- order
  - 决定 flex items 的排布顺序
  - 可以设置任意整数（正整数、负整数、0）值越小就越排在后面
  - 默认值是 0
- align-self
  - flex items 可以通过 align-self 覆盖 flex container 设置的 align-items
  - auto（默认值）：遵从 flex container 的 align-items 设置
  - 效果跟 align-items 一致
- flex-grow 决定 flex items 如何扩展
  - 可以设置任意非负数字（正小数，正整数，0）默认是 0
  - 当 flex container 在 main axis 方向上有剩余 size 时，flex-grow 属性才会有效
  - 如果所有 flex items 的 flex-grow 总和 sum 超过 1，每个 flex item 扩展的 size 为
    - flex container 的剩余 size\*flex-grow/sum
  - 如果所有 flex items 的 flex-grow 总和 sum 不超过 1，每个 flex item 扩展的 size 为
    - flex container 的剩余 size\*flex-grow
- flex-shrink 决定 flex items 如何收缩
- flex-basis
  - 用来设置 flex items 在 main axis 方向上的 base size
  - auto 默认值 具体的宽度数值
- flex
  - flex-grow||flex-shrink||flex-basis 的缩写属性
  - 单值语法：值必须为以下其中之一
    - 一个无单位数（<number>）：会被当做<flex-grow>
    - 一个有效的宽度（width）值：会被当做<flex-basis>
    - 关键字 none，auto 或 initial
  - 双值语法：第一个值必须为一个无单位数，并且他会被当作<flex-grow>
    - 第二个值必须为以下之一：
      - 一个无单位数：会被当做<flex-shrink>
      - 一个有效的宽度值：会被当做<flex-basis>
  - 三值语法：
    - 第一个无单位数：会被当做<flex-grow>
    - 第二个无单位数：会被当做<flex-shrink>
    - 第三个有效的宽度值：会被当做<flex-basis>
