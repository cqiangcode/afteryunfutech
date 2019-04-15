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
# 在添加脚本前，需要在全局安装 pycodestyle 和 eslint 以及 eslint 运行所需要的所有插件 
# 还要注意脚本的环境变量  脚本默认启动用户为 git
FRONTEND='frontend'
ESFILE='frontend/.eslintrc.js'
TMP_DIR=$(mktemp -d)
errors_count=0
array=0
EMPTY_REF='0000000000000000000000000000000000000000'
while read oldVersion newVersion branch;
do
  if [[ $oldVersion != $EMPTY_REF && $newVersion != $EMPTY_REF ]]; then
    mkdir -p $(dirname $TMP_DIR/$ESFILE)
    git show ${newVersion}:${ESFILE} > $TMP_DIR/$ESFILE
    for line in $(git diff --name-status $oldVersion $newVersion | grep -oP '.*\.(py|js|vue)' | awk '{print $1$2}')
      do
        status=$(echo $line | grep -o '^.')
        if [[ $status == 'D' ]]; then
          continue
        fi
        file=$(echo $line | sed 's/^.//')
        mkdir -p $(dirname $TMP_DIR/$file)
        git show $newVersion:$file > $TMP_DIR/$file
        if [[ $file =~ .*\.(py) ]]; then
          output=$(pycodestyle $TMP_DIR/$file)
        else
          name[$array]=$file
        fi
        msg="${file}: "
        if [ "$output" != "" ]; then
          let "errors_count = errors_count + 1"
          msg="$msg${output}"
          echo -e "$msg"
        fi
      done
    cd $TMP_DIR/$FRONTEND
    for file in $name
      do
        msg="${file}: "
        output=$(eslint $TMP_DIR/$file)
        if [ "$output" != "" ]; then
          let "errors_count = errors_count + 1"
          msg="$msg${output}"
          echo -e "$msg"
        fi
      done
  fi
done
rm -rf $TMP_DIR
if [ $errors_count -eq 0 ]; then
  exit 0
fi
echo "errors_files: ${errors_count}"
exit 1
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
  # 把 pre-commit 写入 项目根目录下的 requirements.txt 中
  # pip install -r requirements
  # 在 根目录下创建 .pre-commit-config.yaml 文件
  repos:
-   repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v1.2.3
    hooks:
    -   id: trailing-whitespace
  # id 即为所检验的规则
```

## .gitignore 添加问题

```bash
  # 若非第一次提交才添加 .gitignore
  git rm -r --cached filename/directory
```

