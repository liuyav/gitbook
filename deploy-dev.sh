
echo Deploy Project ...

# 拉取最新代码
git pull origin dev

# 设置淘宝源安装依赖，之后打包
npm i && npm run build


docker run -p 4000:80 -v $PWD/_book:/vaw/www/html/project -d nginx
