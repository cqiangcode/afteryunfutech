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
2. 