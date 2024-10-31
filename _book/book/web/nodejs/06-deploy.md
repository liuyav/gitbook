# Docker 是什么

> Build，Ship and Run Any App，Anywhere 一次封装，到处运行。

基于 Linux 的高效、敏捷、轻量级的容器（轻虚拟化）方案。

- 完全虚拟化 VMware Workstation、VirtualBox
- 硬件虚拟化技术 InterVT AMD-T
- 超虚拟化 Xen
- 操作系统级 Docker LXC容器

特点：

- 高效的利用系统资源
- 快速的启动时间
- 一致的运行环境
- 持续交付与部署
- 更轻松的迁移


# Docker 安装

## 申请云服务器

- 购买 ubuntu 服务器
- 生成公钥 ssh-keygen -t rsa
- 上传公钥到服务器 ssh-copy-id root@[serverName]
- 登录 ssh root@[serverName]

## 安装常用软件与 Docker



# Docker 基本命令

```
// 简单启动
//		将虚拟机 /usr/share/nginx/html 目录映射到当前目录下的 www 下
//		将虚拟机的 80 端口映射到本机的 8000 端口
//		加上 -d 以后台模式启动进程，并且打印一个 uuid
docker run -p 8000:80 -v $PWD/www:/usr/share/nginx/html -d nginx

// 查看进程（加上 -a 查询所有的容器，包括没有启动的）
docker ps -a

// 停止进程
docker stop pid

// 开启进程
docker start pid

// 查看 Nginx 镜像
docker images nginx

// 删除镜像
docker rm pid

// 拉取镜像
docker pull nginx

// 查看镜像
docker image nginx

// 制作镜像（在当前目录下定制一个名字叫 myimage 镜像）
docker build -t myimage .

// 启动定制镜像（在 8000 端口后台运行 myimage 镜像）
docker run -p 8000:80 -d myimage

```



# Docker 运行过程

- 镜像（Image）面向 docker 只读模板
- 容器（Container）镜像的运行实例
- 仓库（Registry）存储镜像的服务器



# DockerFile 定制镜像

定制 nginx 镜像

```dockerfile
FROM nginx:latest
RUN 
```

定制 nodejs 镜像

```dockerfile
// node 10 lunix 经典版（更小）
FROM node:10-alpine
// 将 Dockerfile 所在目录文件拷贝到虚拟机的 /app/ 目录
ADD . /app/
// 进入 app 目录
WORKDIR /app
// 执行 npm install
RUN npm install
// 暴露 3000 端口
EXPOSE 3000
// 执行 node app.js
CMD ["node", "app.js"]
```

定制 pm2 镜像

```dockerfile
FROM keymetrics/pm2:latest-alpine
// 将 Dockerfile 所在目录文件拷贝到虚拟机的 /usr/src/app 目录
ADD . /usr/src/app
// 进入 app 目录
WORKDIR /usr/src/app
// 执行 npm install
RUN npm install
// 暴露 3000 端口
EXPOSE 3000
// 执行 node app.js
CMD ["pm2-runtime", "start", "process.yml"]
```

process.yml

```yaml
app:
	script: app.js
	instance: 2
	watch: true
	env:
		NODE_ENV: production
```



# docker-compose

安装：apt install docker-compose

配置 docker-compose.yml

```yaml
version: '3.1'
services:
	mongo:
		image: mongo
		restart: always
		ports:
			- 27017:27017
	mongo-express:
		image: mongo-express
		restart: always
		ports:
			// 8081 镜像内部默认端口
			- 8000:8001
```

启动：docker-compose up -d --force-recreate --build

关闭：docker-compose down



# 实战 nginx

## 使用 vs-deploy

在 .vscode/settings.json 中 配置 vs-deploy

### 配置 docker.conf 文件

```js
server {
  listen: 80
  
  location / {
    root	/var/www/html
    index	index.html index.htm
  }
  
  location ~ \.(gif|jpg|png)$ {
    root	/static
    index	index.html index.htm
  }
}
```

### 配置 docker-compose.yml

```yaml
version: '3.1'
services:
	nginx:
		restart: always
		image: nginx
		ports:
			- 8091:80
		volumes:
			// 映射 docker nginx 配置
			- ./nginx/conf.d:/etc/nginx/conf.d
			// 映射输入目录
			- ./frontend/dist:/var/www/html
			// 映射静态资源目录
			- ./static/:/static/
```



# 实战 nodejs



# 建一个高可用的 node 环境

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
