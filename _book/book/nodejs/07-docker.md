# 一、申请云服务器

- 购买 ubuntu 服务器
- 生成公钥 ssh-keygen -t rsa
- 上传公钥到服务器 ssh-copy-id root@[serverName]
- 登录 ssh root@[serverName]



# 二、linux

复制文件 scp local_folder remote_username@remote_ip:remote_folder

复制目录 scp -r local_folder remote_username@remote_ip:remote_folder



安装 curl

sudo apt-get install curl

安装 nvm

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

重启终端 source .bashrc