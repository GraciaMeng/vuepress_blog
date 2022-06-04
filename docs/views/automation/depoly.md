---
title: github.io自动化部署
date: 2022-6-4
categories:
  - 自动化
tags:
  - 自动化
publish: true
---

<!-- more -->

# 背景
以前部署步骤:
本地开发的代码 ==> build成上线的dist包 ==> 打包 or scp命令上传到服务器
服务器的nginx配置好文件夹 ==> 域名的配置文件 （域名映射）

# 自动化方案
借助GitHub或者Gitee的action功能，支持push驱动，启动一个小的虚拟机，帮助我们跑build和scp的过程