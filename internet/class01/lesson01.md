### 课程介绍与内容综述

#### 会介绍哪些工具

1. Wireshark: 抓包工具, 写插件, 分析 tcpdump 导出的包
2. tcpdump: 服务端, 抓包工具.
3. Packetdrill: Google的, 构造包的工具. 详细教学
4. Scapy: 构造包的工具
5. SystemTap 
6. telnet, nc
7. iptables: 防火墙, 模拟丢包



#### TCP课程安排

1. 三次握⼿、四次挥⼿背后的底层原理
2. TCP 临时端⼜号的分配算法是什么
3. TCP 的⼗⼀种状态如何模拟以及如何互相转换
4. 半连接、全连接队列是什么，backlog 参数有什么作⽤
5. TCP SYN Flood 攻击背后的原理
6. TCP 最不好理解的 TIME_WAIT 状态是什么
7. 流量控制、滑动窗⼜、拥塞控制、快重传、慢启动等概念
8. 常见⽹络⾯试题分析



#### 应⽤层协议

##### HTTP/ 1.x

1. 协议解析
2. 缓存控制
3. 同源策略与跨域
4. Restful

##### 应⽤层协议

1. TLS/SSL 协议的⼯作原理
2. ⾮对称加密算法 RSA、对称加密算法 AES 原理
3. PKI 证书体系
4. 详解握⼿的过程

##### HTTP/2

1. 为什么会出现 HTTP/2
2. 帧格式
3. ⾸部压缩
4. 服务端主动推送
5. HTTP/2 与 gRPC

##### WebSocket

1. WebSocket 的出现解决了什么问题
2. WebSocket 协议格式
3. WebSocket 的实战应⽤



#### 容器⽹络

1. veth-pair 原理
2. Bridge ⽹络原理
3. iptables 与 NAT
4. 从零到⼀写⼀个 Docker



#### ⽹络编程

1. select、poll、epoll 的使⽤
2. epoll 的底层源码剖析
3. I/O 模型

