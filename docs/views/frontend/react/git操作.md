git init 初始化仓库

git status 查看当前仓库的状态信息

git add \<filename> 即将该单个文件加入暂存区

git add . 将所有修改文件加入暂存区

git commit -m \<message> 提交并添加描述

git log查看日志

# 回退reset

git reset \<arg>  

- \<filename> add一个文件但是后悔了，本次提交不应有他，在commit之前使用
- \<commitId>退回版本
  - --hard 不保存所有变更
  - --soft 保留变更且变更内容处于Staged
  - --mixed 保留变更内容且变更内容处于Modified
- 如果后悔想回到最新的commit？可以git reflog查看所有，再次使用git reset

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

# 分支branch

git checkout -b \<name> \<template>

- name 是新分支名字
- template 是指以哪个分支或者commit为模板，不填则以当前分支为模板
- 如果template不是本地的，是来自远程仓库的话，需要在template前加个origin

git branch 查看所有分支

git checkout \<branchName> 切换分支

# 合并merge

git merge \<branchName> 合并分支

# 远程仓库remote

git clone \<url>

git push

git push --set-upstream origin \<本地分支> 将远程仓库分支作为本地分支的上流分支

- --set-upstream 指设置上流分支
- origin 远端仓库

git fetch 拉取远程仓库信息

git pull 等同于git fetch + git merge

# 变基rebase

git rebase \<branchName>

- --continue 继续下一commit节点的rebase