# git hooks 相关设置

* 常见的 客户端 pre-commit, 服务器端 pre-receive

1. git hooks 位置
```bash
  # 客户端 git hooks
  $ 当前项目根目录/.git/hooks
  # gitlab 服务器端 全局 git hooks
  $ /var/opt/gitlab/git-data/repositories/<GROUP>/<username>.git/hooks
  # 项目自定义 git hooks
  $ touch /var/opt/gitlab/git-data/repositories/<GROUP>/<username>.git/custom_hooks/pre-receive
```
2. pre-receive 脚本
```bash
#!/usr/bin/env bash
while read oldVersion newVersion branch
do
  echo ${oldVersion} # 版本号 git log --pretty=oneline --graph
  echo ${newVersion} # 版本号
  echo ${branch} # 分支名字 head/master
```
3. gitlab 的仓库具体存放位置: 文件以二进制大文件Blob的形式存放,
具体的文件内容需要 git show $version:$file 获取

## pre-commit 包

1. node | npm install pre-commit --save-dev
```bash
  # 需要包含 "pre-commit" 的 package.json 需要和 .git 文件夹处于同一个目录下
```
2. python | pip install pre-commit

[pre-commit官方链接](https://pre-commit.com/)
```bash
  # 不懂 python ...
```

## .gitignore 添加问题

```
  目前在非第一次提交时添加 .gitignore 文件不会出现问题
```

