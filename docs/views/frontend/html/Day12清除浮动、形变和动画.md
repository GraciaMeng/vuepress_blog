---
title: Day12清除浮动、形变和动画
date: 2020-6-20
categories:
 - css
tags:
 - css
publish: true
---

<!-- more -->

# 内容概述

## 一、清除浮动

clear

- left 要求元素的顶部低于之前生成的所有左浮动元素的底部

- right 要求元素的顶部低于之前生成的所有右浮动元素的底部

- both 要求元素的顶部低于之前生成的所有浮动元素的底部

- 建议添加类 例如class="container clear-fix"

- ```Html
  .clear-fix::after {
  	content:''; /*真正起作用只有前三个*/
  	display:block;
  	clear:both;
  	height:0;/*兼容旧浏览器*/
  	visibility:hidden;/*兼容旧浏览器*/
  }
  .clear-fix {
  	*zoom:1 /*兼容IE6-7浏览器*/
  }
  ```

## 二、形变和动画

tranform：允许你旋转，缩放，倾斜或平移给定元素

- translate（x,y）平移
  - 值个数
    - 一个值时，设置x轴上的位移
    - 二个值时，设置x轴和y轴上的位移
  - 值类型
    - 数字：100px
    - 百分比：参照元素本身的宽度
- scale(x,y) 缩放
  - 值个数
    - 一个值时，设置x轴和y轴同时的缩放
    - 二个值时，设置x轴和y轴上的缩放
  - 值类型
    - 数字
      - 1：保持不变
      - 2：放大一倍
      - 0.5：缩小一半
    - 百分比：不支持
- rotate(deg) 旋转
  - 值个数
    - 一个值时，表示旋转的角度
  - 值类型
    - deg：旋转的角度
    - 正数为顺时针
    - 负数为逆时针
  - 注意：旋转的原点受transform-orign的影响
- skew(deg,deg) 倾斜
  - 值个数
    - 一个值时，表示x轴上的倾斜的角度
    - 两个值时，表示x轴和y轴上的倾斜
  - 值类型
    - deg：倾斜的角度
    - 正数为顺时针
    - 负数为逆时针
  - 注意：旋转的原点受transform-orign的影响

transform-orign：变形的原点（css样式）

- 一个值：
  - 设置x轴的原点
- 两个值：
  - 设置x轴和y轴的原点
- 必须是<length>,<percentage>或left，center，right，top，bottom关键字其中的一个
  - left，center，right，top，bottom关键字
  - length:从左上角开始计算
  - 百分比：参考元素本身大小

transition 过渡动画

- transition-property指定应用过度属性的名称
  - 可以写all表示所有可动画的属性
  - transform/height/width/all
- transition-duration：指定过度动画所需的时间
  - 单位可以是秒s或毫秒ms
- transition-timing-function：指定动画的变化曲线（动画的变化速度）
- transition-delay：指定过渡动画执行之前的等待时间





## 三、vertical-align

- text-align:center right left

- vertical-align:影响行内级元素在一个行盒中垂直方向的位置
  
  - baseline（默认值）：基线对齐
  - top：把行内级盒子的顶部跟line boxes顶部对齐
  - bottom：把行内级的底部跟line-box底部对齐
  - middle：行内级盒子的中心的与父盒基线加上x-height一般的线对齐
  - baseling
  
- 定位
  - normal flow（标准流） 垂直布局
  - absolute positioning（绝对定位） 层叠布局
  - float（浮动） 水平布局
  
- 注意：图片想要垂直居中

- ```css
  img {
      position:releative;
      top:50%;
      transform:translate(0,-50);
  }
  ```

  

