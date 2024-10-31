## mongo 命令行
数据库操作：
  - 查看所有数据库（为空的不显示）：show dbs
  - 正在使用的数据库：db
  - 切换数据库（不存在，则新建）：use <dbname>

表操作：
  - 查看表：db.collections

表插入：
  - 新增一条数据：db.collection.insert(data)
  - 新增多条数据：db.collection.insertMany([data1, data2, ...]);

表删除：
  - 删除数据：db.collection.remove(condition)

表查询操作：
  - 查看所有数据：db.collection.find()
    - 相当于 db.collection.find({})
    - 可以增加第二个参数，自定义返回字段
      - db.collection.find({}, {key: 1, _id: 0}) id的默认为1，默认返回，0为不返回
  - 按条件查询数据：db.collection.find(condition)
    - collection 里面可以使用正则进行匹配
  - 查询条件：db.find({key: {$gt: num, $lt: num}})
    - $gt $gte
    - $lt $lte
    - $ne !=
    - $in $nin（在一个字段中查找）
    - $or（可以是多个字段）
    - $type
      - Double 1
      - String 2
      - Object 3
      - Array 4
      - Boolean 8
      - Date 9
      - Null 10
      - REGEXP 11
      - 以上常用、其他不列举了...
    - $not
    - $and

表更新操作
  - 更新数据（只会更新满足条件的第一个，一条数据的所有字段）：db.collection.update(condition, newVal);
  - 更新多条数据中的一个字段：db.collection.update(condition, {$set: newVal}, false, true)
    - 第三个参数代表，如果未查询到更新数据，是否插入一条，默认false，不插入
    - 第四个参数代表，查询到更新数据之后，是否更新多条
  - 增加已有键的值，如果没有则新建（更新满足条件的第一个）：db.collection.update(condition, {$inc: newVal})
  - 向已有数组尾部追加一个元素，如果没有就创建新数组：db.collection.update(condition, {$push: newVal})
  - 向已有数组尾部追加多个元素：db.collection.update(condition, {$push: {newValKey: {$each: newValArray}}})
  - slice 固定数组长度，不足则添加，多了则会保存最新的固定长度：db.collection.update(condition, {$push: {newValKey: {$each: newValArray, $slice: fixNum}}})
    - fixNum 为负数，当元素溢出的时候，保存最新的
    - fixNum 为整数，当元素溢出的时候，保存最先添加进去的
  - 向数组添加一个元素，如果数组不存在则创建，添加元素不存在则添加，否则，不添加：db.collection.update(condition, {$addToSet: newVal})
  - 向数组添加多个元素，如果数组不存在则创建，添加元素不存在则添加，否则，不添加：db.collection.update(condition, {$addToSet: {$each: [newVal1, newVal2, ...]}})
  - 删除数组中一个元素：db.connection.update(condition, {$pop: key: num})
    - num 为 1 则表示从尾部删除， -1 表示从头部删除
  - 按条件删除数组中的元素（可以是多个）：db.connection.update(condition, {$pull: newVal})
  - 访问数组下标
    - array.0（数组第0个元素）
    - db.collection({a: 1}, {$set: {a.$: 2}})  ​$表示当前满足条件的索引
  - save 接受一个参数，这个参数就是文档，当文档里面有 _id 参数则表示更新，否则为插入操作
