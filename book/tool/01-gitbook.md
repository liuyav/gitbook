## 一、安装与初始化

1. nvm切换nodejs版本v9.11.2
2. 指定npm镜像源地址 npm config set registry https://registry.npmmirror.com
3. 全局安装gitbook-cli（npm i gitbook-cli -g）
4. 新建书文件夹并进入，执行 gitbook init



## 二、启动与打包

1. gitbook serve 启动 并在 http://localhost:4000 进行预览
2. gitbook build 打包生成 _book 文件夹就是打包的静态网页