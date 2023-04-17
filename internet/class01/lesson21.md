### 21. HTTP 协议基础

#### HTTP 报⽂

1. 起始行
   1. 请求行
      1. 请求方法: GET 跟着一个空格
         1. GET: 获取资源,可以理解为读取或者下载数据
         2. HEAD: 获取资源的元信息, 可以用来查询资源是否可用. 返回响应头
         3. POST: 向资源提交数据,相当于写⼊或上传数据
         4. PUT: 类似 POST
         5. DELETE: 删除资源
         6. OPTIONS: 列出可对资源实⾏的⽅法
      2. 请求地址: / 跟着一个空格
      3. 版本信息: HTTP/1.1 CRLF
   2. 状态行
      1. 版本信息: HTTP/1.1 
      2. 状态码: 200
         1. 1××: 提⽰信息,表⽰⽬前是协议处理的中间状态,还需要后续的操作
            1. 101, 关键字 Upgrade 字段, 协议升级
         2. 2××: 成功,报⽂已经收到并被正确处理
            1. 200 OK: 成功返回响应
            2. 202 Accepted: 服务器接收并开始处理请求, 但请求未处理完成
            3. 204 No Content: 成功执⾏了请求且不携带响应包体
            4. 206 Partial Content: 分块下载或断点续传的基础
               1. 关键字 Range 字段, 内容区间
         3. 3××: 重定向,资源位置发⽣变动,需要客户端重新发送请求
            1. 301 Moved Permanently: 资源永久性的重定向 
            2. 302 Found: 资源临时的重定向; 短链接
               1. 关键字 Location 字段, 重定向地址
            3. 304 Not Modified: 304 告诉客户端可以 复⽤缓存
         4. 4××: 客户端错误,请求报⽂有误,服务器⽆法处理
            1. 400 Bad Request: 客户端出现了错误
            2. 401 Unauthorized: ⽤户认证信息缺失或者不正确
            3. 403 Forbidden: ⽆权限
            4. 404 Not Found: 服务器没有找到对应的资源
            5. 405 Method Not Allowed: 不允许使⽤某些⽅法操作资源，例如不允许 POST 只能 GET
            6. 406 Not Acceptable: 资源⽆法满⾜客户端请求的条件，例如请求中⽂但只有英⽂
            7. 408 Request Timeout: 请求超时，服务器等待了过长的时间
            8. 409 Conflict: 多个请求发⽣了冲突，可以理解为多线程并发时的竞态
            9. 413 Request Entity Too Large: 请求报⽂⾥的 body 太⼤
            10. 414 Request-URI Too Long: 请求⾏⾥的 URI 太⼤；
            11. 429 Too Many Requests: 客户端发送了太多的请求，通常是由于服务器的限连策略
            12. 431 Request Header Fields Too Large: 请求头某个字段或总体太⼤；
         5. 5××: 服务器错误,服务器在处理请求时内部发⽣了错误
            1. 500 Internal Server Error: 服务器内部错误
            2. 502 Bad Gateway: 代理服务器⽆法获取到合法响应
            3. 503 Service Unavailable: 服务器当前忙，暂时⽆法响应服务
            4. 504 Gateway Timeout: 超时
      3. 原因: OK
2. 请求头
3. 空行
4. 请求体