---
title: git学习
date: 2021-01-15
categories:
  - 学习笔记
tags:
  - git
publish: true
sticky: 1   //文章置顶 1, 2, 3, ...
---
<!-- more -->

git init 初始化仓库

git status 查看当前仓库的状态信息

git add \<filename> 即将该单个文件加入暂存区

git add . 将所有修改文件加入暂存区

git commit -m \<message> 提交并添加描述

git log 查看日志

# 回退 reset

git reset \<arg>

- \<filename> add 一个文件但是后悔了，本次提交不应有他，在 commit 之前使用
- \<commitId>退回版本
  - --hard 不保存所有变更 （删除工作空间改动代码，撤销commit，撤销git add .）
  - --soft 保留变更且变更内容处于 Staged （不删除工作空间改动代码，撤销commit，不撤销git add . ）
  - --mixed 保留变更内容且变更内容处于 Modified （不删除工作空间改动代码，撤销commit，并且撤销git add . 操作）
- 如果后悔想回到最新的 commit？可以 git reflog 查看所有，再次使用 git reset
- **git reset --soft HEAD^**
- HEAD^的意思是上一个版本，也可以写成HEAD~1，如果你进行了2次commit，想都撤回，可以使用HEAD~2。
- **git commit --amend** 修改commit信息

alias

```
gitconig文件
[alias]
	ad = add .
	cmm = commit -m
	lg = log
	rlg = reflog
	co = checkout
	cob = checkout -b
	cod = checkout develog
	com = checkout master
	fc = fetch
	cm = commit
	st = status
	pl = pull
	ps = push
```

# 分支 branch

git checkout -b \<name> \<template>

- name 是新分支名字
- template 是指以哪个分支或者 commit 为模板，不填则以当前分支为模板
- 如果 template 不是本地的，是来自远程仓库的话，需要在 template 前加个 origin

git branch 查看所有分支

git checkout \<branchName> 切换分支

# 合并 merge

git merge \<branchName> 合并分支

# 远程仓库 remote

git clone \<url>

git push

git push --set-upstream origin \<本地分支> 将远程仓库分支作为本地分支的上流分支

- --set-upstream 指设置上流分支
- origin 远端仓库

git fetch 拉取远程仓库信息

git pull 等同于 git fetch + git merge

# 变基 rebase

git rebase \<branchName>

- --continue 继续下一 commit 节点的 rebase

# 解决冲突

先把自己的

git add .

git commit -m 'xxx'

然后

git pull origin master

再重新 git add commit 操作
