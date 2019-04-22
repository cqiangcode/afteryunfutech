# 进程通信的常见方式

1. 管道(多指无名管道)
```
  1. 半双工，有固定的读端和写端
  2. 只能用于父子进程或者兄弟进程
  3. 只存在于内存中的特殊文件
```
```c++
  #include <unistd.h>
  // fd[0] 读 | fd[1] 写
  int pipe (init fd[2])
  // 关闭读端
  close(fd[0]) 
```
2. FIFO(命名管道)
```
  1. 可以在无关的进程间交换数据
  2. 存在于文件系统中的特殊文件
```
```c++
  int fd
  mkfifo('fifo1', 0666)
  fd = open('fifo1', O_RONLY)
  // 使用正常的文件 I/O 函数进行读写
```
3. 消息队列
```
  1. 消息队列由标识符
  2. 消息队列独立于进程
  3. 可以实现消息随机查询，可以按类型读取
```
```c++
  // 创建队列 ID
  key_t ftok(const char * fname, int id )
  // 创建消息队列
  int msgget(key_t key, int flag);
  // 读取消息 | type = 0 返回第一个消息 | type > 0 返回类型为 type 的第一个消息 | type < 0 返回小于 type 绝对值的值中类型值最小的消息
  int msgrcv(int msqid, void *ptr, size_t size, long type,int flag);
  // 添加消息
  int msgsnd(int msqid, const void *ptr, size_t size, int flag);
```
4. 信号量
```
  1. 用于进程间同步
  2. 基于 PV 操作
```
5. 共享内存
```
  1. 是最快的一种 IPC， 进程直接对内存的读写
```
6. 套接字 Socket
```
  1. 创建 socket:
    int socket(int domain, int type, int protocol);
      domain: 本地套接字： AF_UNIX
      type: SOCK_STREAM 流式套接字 基于 TCP/IP | SOCK_DGRAM 数据报式套接字 
      protocol: 0
      return： 套接字描述符
  2. 命名 socket
    (1) 普通命名 创建同名的 socket 文件，链接此文件而链接 socket 服务端
    (2) 抽象命名 如下代码
  3. 绑定 socket
    服务器端:
    int bind(int socket, const struct sockaddr *address, size_t address_len);
      bind(socketfd, &sockaddr_un, sizeof(sockaddr_un))
    客户端:
        
```
```c++
    #define SERVER_NAME @socket_server
    struct sockaddr_un {
    sa_family_t   sun_family;   /* AF_UNIX */
    char  sun_path[UNIX_PATH_MAX];    /* 路径名 */
    };
    strcpy(server_addr.sun_path, SERVER_NAME);
    server_addr.sun_path[0] = 0;
```
7. 信号(singal)