## 一、linux 常用命令

查看文件：cat filename

写入文件：echo "hello" >>> www/index.html

复制文件 scp local_folder remote_username@remote_ip:remote_folder

复制目录 scp -r local_folder remote_username@remote_ip:remote_folder



安装 curl

sudo apt-get install curl

安装 nvm

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

重启终端 source .bashrc