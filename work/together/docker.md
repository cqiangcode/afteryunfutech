# DOCKER 相关

## docker 基本命令

```bash
  # 启动 docker 服务
  $ sudo server docker start
  $ sudo systemctl start docker
  # image 相关
  $ docker image ls
  $ docker image rm [imageName]
  $ docker image pull hello-world # 默认的 docker hub 的 library 目录下
  # container 相关
  $ docker container run image-name
  $ docker container kill [container ID]
  $ docker container ls # 列出正在运行的容器 添加 --all 可以同时列出停止运行的 container
  $ docker container rm [container ID]
  $ docker container start [container ID]
  $ docker container stop [container ID]
  $ docker container logs [container ID]
  $ docker container exec -it [container ID] /bin/bash
  # 把 docker 中的文件复制到本机的当前目录
  $ docker container cp [container ID]:[path/to/file] .

  $ docker image build -t image-name:tag .
  # -t 后跟 image 名字 tag 代表版本号 默认是 latest
  # 最后的 . 代表 Dockerfile 所在目录
  $ docker container run -p 8000:3000 -it image-name:tag /bin/bash
  # -p 端口映射 本机端口:容器端口
  # -it 容器的 Shell 映射到当前的 Shell
  # /bin/bash 容器启动以后内部执行的第一个命令，会覆盖 Dockerfile 中的 CMD
  # -rm 参数 
  # --name 新建容器名称
  # -v 本机目录:容器目录  把本机目录映射到容器目录
```

## Dockerfile 相关

* .dockerignore 文件

```bash
  # 目录下新建 .dockerignore 文件, 写进去不打包进 image 的文件
  .git
  node_modules
```

* Dockerfile 文件

```bash
  # 从 old image 到 new image 的文件
  FROM yunfutech/alpine-python:0.0.1 # old image
  WORKDIR /app # 设置下面的默认工作目录
  COPY . . # 把当前文件夹复制到 docker 内部的 /app 文件夹中
  RUN pip install -r requirements.txt && python manage.py migrate # 有一个 run 即生成一个 container 并且 commit 出新的image

  EXPOSE 8000
  ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]
  # run 可以有多个， CMD 只能有一个
```

```
  DOCKER 文件中，ENTERPOINT 和 CMD 的 区别：
    。。。未完待续
```

