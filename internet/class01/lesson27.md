### WebSocket

####  帧类型

1. FIN 是消息结束的标志位, 相当于 HTTP/2 ⾥ 的 "END_STREAM" , 表⽰数据发送完毕
2. 1~3 保留帧
3. opcode
   1. 持续帧
      1. 0: 继续前⼀帧
   2. ⾮控制帧
      1. 1: ⽂本帧
      2. 2: ⼆进制帧
      3. 3-7: 保留
   3. 控制帧
      1. 8: 关闭帧
      2. 9: Ping ⼼跳帧 server send
      3. A: Pong ⼼跳帧 client send
      4. B-F：保留
4. mask: client 为 true; server: false;
5. payload length: 帧内容的长度

#### 握手协议

一个 http get 请求进行握手

1. Connection: Upgrade; 表⽰要升级协议;
2. Upgrade: websocket; 表⽰要升级到websocket协议;
3. Sec-WebSocket-Version: 13: 表⽰websocket的版本;
4. Sec-WebSocket-Key: 与后⾯服务端响应⾸部的Sec-WebSocketAccept是配套的,提供基本的防护,⽐如恶意的连接,或者⽆意的连接.

























