### wireshark基础介绍

#### 捕获过滤器 capture filter

抓取满⾜特定条件的包，丢弃不感兴趣的包

#### 显示过滤 Display filter

[语法文档](https://gitlab.com/wireshark/wireshark/-/wikis/DisplayFilters)

Wireshark helps

##### 常用的显示过滤器

###### TCP 相关

1. tcp.flags.syn==1：过滤 SYN 包
2. tcp.flags.reset==1：过滤 RST 包
3. tcp.analysis.retransmission：过滤重传包
4. tcp.analysis.zero_window：零窗⼝

###### HTTP 相关

1. http.host==t.tt：过滤指定域名的 http 包
2. http.response.code==302：过滤http响应状态码为302的数据包
3. http.request.method==POST：过滤所有请求⽅式为 POST 的 http 请求包
4. http.transfer_encoding == "chunked" 根据transfer_encoding过滤
5. http.request.uri contains "/appstock/app/minute/query"：过滤 http 请求 url 中包含指定路径的请求

###### 通信延迟常用的过滤器

1. http.time>0.5：请求发出到收到第⼀个响应包的时间间隔，可以⽤这个条件来过滤 http 的时延
2. tcp.time_delta>0.3：tcp 某连接中两次包的数据间隔，可以⽤这个来分析 TCP 的时延
3. dns.time>0.5：dns 的查询耗时通信延迟常⽤的过滤器

###### 比较运算符

1. 等于：== 或者 eq
2. 不等于：!= 或者 ne
3. ⼤于：> 或者 gt
4. ⼩于：< 或者 lt
5. 包含 contains
6. 匹配 matches
7. 与操作：AND 或者 &&
8. 或操作：OR 或者 ||
9. 取反：NOT 或者 !



#### 跟踪 TCP 数据流

#### 给 wireshark 写插件

[插件地址](https://juejin.cn/post/6844904085125070861)