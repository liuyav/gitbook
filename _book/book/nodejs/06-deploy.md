## 构建一个高可用的 node 环境
1. 故障恢复
2. 充分多核资源的利用
3. 多进程共享端口
  - cluster 模块
  - fork 模式

## nodejs 中实现端口重用的原理

## 文件上传服务器
1. scp
2. git
3. deploy插件

## pm2
1. 内建负载均衡
2. 线程守护
3. 0秒停机重载

## docker命令
简单启动：docker run -p 80:80 -v $PWD/www:/user/share/nginx/html -d nginx
查看进程：docker ps
停止进程：docker stop pid
删除镜像：docker rm pid
拉取镜像：docker pull nginx
查看镜像：docker image nginx
制作镜像：docker build -t myimage .
启动定制镜像：docker run -p 80:80 -d myimage

## Dockerfile 文件

## Docker-Compose
启动：docker-compose up -d --force-recreate --build
关闭：docker-compose down

## Docker/Github Webhook实现CI的持续集成