### 10. TCP 11 种状态变迁和模拟

#### 1. CLOSED

这个状态是⼀个"假想"的状态, 默认的初始化值.

1. 主动打开(Active Open) -> 发送一个 SYN 包之后 -> 到达状态 SYN_SENT
2. 被动打开(Passive Open) -> 到达状态 LISTEN



#### 2. LISTEN

等待客户端发送 SYN 报⽂三次握⼿建⽴连接



#### 3. SYN_SENT

客户端发送 SYN 报⽂等待 ACK 的过程进⼊ SYN-SENT状态. 

同时会开启⼀个定时器, 如果超时还没有收到 ACK 会重发 SYN



#### 4. SYN-RCVD

服务端收到SYN报⽂以后会回复 SYN+ACK, 然后等待对端 ACK 的时候进⼊SYN-RCVD.



#### 5. ESTABLISHED

SYN-SENT 或者 SYN-RCVD 状态的连接收到对端确认 ACK 以后进⼊ ESTABLISHED状态, 连接建⽴成功.

1. 主动关闭 -> 发送 FIN 包 -> 进入FIN_WAIT_1 状态
2. 被动关闭 -> 发送 ACK 通知对方它的 FIN 包已经收到 -> 发送自己的 FIN 包 ->进入 CLOSE_WAIT



#### 6. FIN_WAIT_1

收到对端的 ACK 之后进入 FIN_WAIT_2

收到对端的 FIN 之后进入 CLOSING (同时关闭)

收到对端的 FIN + ACK 之后进入 TIME_WAIT (四次挥手, 二三步合并)



#### 7. FIN_WAIT_2

收到对端的 FIN 之后进入 TIME_WAIT



#### 8. CLOSE-WAIT 

被动关闭收到对端 FIN 的时候进入的状态



#### 9. TIME-WAIT

这个状态是收到了被动关闭⽅的 FIN 包, 发送确认 ACK 给对端, 开启 2MSL 定时器, 定时器到期时进⼊ CLOSED 状态, 连接释放.



#### 10. LAST-ACK

被动关闭方发送 FIN 和 ACK 之后, 等待对方的 ACK 关闭连接.



#### 11. CLOSING

主要出现在同时关闭, 我发出 FIN 之后 ,没收到对端 ACK 之前先收到了 FIN. 就会进入 CLOSING 状态.

