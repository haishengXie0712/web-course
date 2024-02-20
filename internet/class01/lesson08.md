### 详解三次握手+自连接问题

#### 三次握手第一步: 客户端发送SYN

注意: SYN报文不携带数据, 但是它占用一个序号, 下次发送数据序列号要加一.

##### 为什么SYN段不携带数据, 却要消耗一个序列号呢?

1. 不占用序列号的段是不需要被确认的, 比如纯 ACK 包.
2. SYN 段需要对方的确认, 需要占用一个序列号.
3. 凡是消耗序列号的TCP报文段, 一定需要对端确认. 如果这个段没有收到确认, 会一直重传直到达到指定的次数为止.



#### 三次握⼿第⼆步: 服务端回复 SYN + ACK

1. 序列号: 存放服务端⾃⼰的序列号;
2. 确认号: 字段指定了对端下次发送段的序号, 这⾥等于客户端 ISN 加 1;



#### 三次握⼿第三步: 客户端回复 ACK

这个 ACK 段⽤来确认收到了服务端发送的 SYN



#### 三次握⼿还交换了什么？

1. 最⼤段⼤⼩ (MSS)
2. 窗⼝⼤⼩ (Win)
3. 窗⼝缩放因⼦ (WS)
4. 是否⽀持选择确认 (SACK_PERM)



#### 初始 ISN ⽣成算法

四元组 + net_secret(确认主机不同) + ktime_to_ns(确认时间不同) = 生成相对随机的SYN 



#### 三次握⼿中的状态变迁

##### Client

1. CLOSED
2. SYN-SENT
3. ESTABLISHED

##### Server

1. CLOSED
2. LISTEN bind端口去监听
3. SYN-RCVD
4. ESTABLISHED



#### 如果客户端发出去的 SYN 包, 服务端⼀直没有回 ACK 会发⽣什么？

会发生重连, 间隔时间为 2^次数 秒; 重传总时间: 63s = 1s+2s+4s+8s+16s+32s; 默认6次.

重连次数可以通过: net.ipv4.tcp_syn_retries 来配置. 涉及到系统调优.



#### TCP 自连接 + 同时打开.












