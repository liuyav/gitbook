##中间件
bodyParser
mongoose

##目录结构
db 数据库存储
models 数据库模型文件
routers 路由文件
schemas 数据库结构文件

##路由
1. 通过路由处理请求，划分不同模块
2. 在模块内部，通过不同的子路由处理不同的请求

##mongoose
1. 下载mongoose
2. 通过命令行启动并指定数据库存放目录 mongod --dbpath=path --port=port
3. Robomongo 可视化工具
4. mongoosejs.com 使用 mongoose操作数据库文档
5. 一个schemas代表数据库中的一个表，通过Schemas定义数据存储结构
6. 定义模型类，操作模型来对数据进行crud，模型类又是基于表
