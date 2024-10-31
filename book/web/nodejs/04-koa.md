## context 对象
1. req
2. res
3. request
4. response
5. state
6. app

## 中间件
1. 顺序执行的需要
2. 切面描述的需要，横向（鉴权、错误处理、日志）

## AOP 编程
1. 语言级 - java
2. 框架级

## 常用中间件
1. 错误中间件（提交代码健壮性）
  - 中间件错误 try/catch
  - 应用级错误 error 事件
  - 严重错误 抛错

## Hash 算法（SHA MD5）

含义

1. 将一个不定长的摘要定长结果

满足条件

1. 摘要（不可逆，防串改）
2. 雪崩效应（密文微小变化，明文剧烈变化）

## 后端算法
1. 摘要
2. 对称 DES
3. 非对称 RSA

## koa 鉴权
**Session/Cookie**
1. cookie 约定头，Set-Cookie
   - 相关方法
     - 取值 cookie req.headers.cookie
     - 设置 res.setHeader('Set-Cookie',  'username=a')
   - 缺点
     - js 可以直接读取，不安全
     - cookie 太小
     - cookie 同源策略
   - 优化方式
     - 通过 cookie session 模式，后端存储键值对的key在前端，键值存储在后端，解决了安全和大小
     - 通过  redis 全局化 session（解决多台node服务器cookie不同源）
2. axios 中配置
   - 中请求拦截器中设置
     - config.headers.common["Authorization"] = "Bearer " + token;
**Token**
1. token 放在header，遵循 jwt 约定
```js
config.headers.common['Authorization'] = "Bearer " + token;
```

2. token 组成
   - 第一部分令牌头，base64 编码
   - 第二部分payload，base64 编码
   - 第三部分hash，对前面部分进行签名

**OAuth（开放授权）**

1. github - 授权码登录
  - 发出授权请求，通过 302 到第三方授权（需要client id）
  - 成功之后，通过 302 到自己的服务器设置的 callback 请求（callback 之后返回 code）
  - callback 请求之后，通过 gettoken 获取真正的 token（gettoken 换取 token 需要 id、密码、code）
  - 通过 token 请求 user 接口，得到个人信息

## restful

## linux
1. 公钥信任

## linux 命令
1. 查看 cat tail vi
