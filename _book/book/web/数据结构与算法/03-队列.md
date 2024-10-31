## 队列的概念
队列是一种特殊的线性表，特殊之处在于只允许在队列的头部删除元素，队列的尾部添加元素。

## 队列方法
1. enqueue，从队列尾部添加一个元素
2. dequeue，从队列头部删除一个元素
3. head，返回队列头部元素
4. size，返回队列大小
5. clear，清空队列
6. isEmpty，判断队列是否为空
7. tail，返回队列尾节点

## 实现方式
**数组方式实现**
```
function Queue() {
  var items = [];

  this.enqueue = function(item) {
    items.push(item);
  }

  this.dequeue = function() {
    return items.shift();
  }

  this.head = function() {
    return items[0];
  }

  this.size = function() {
    return items.length;
  }

  this.isEmpty = function() {
    return items.length === 0;
  }

  this.clear = function() {
    items.length = 0;
  }

  this.tail = function() {
    return items[items.length - 1];
  }
}
```
**链表方式实现**

## 应用
**约瑟夫环（每三个删除一个）**
```
var arr = [];
for (var i = 0; i < 100; i++) {
  arr.push(i);
}

var delRing = function(arr) {
  var queue = new Queue();

  for (var i = 0; i < arr.length; i++) {
    queue.enqueue(arr[i]);
  }

  var index = 0;
  while (queue.size() != 1) {
    var item = queue.dequeue();
    index++;

    if (index % 3 != 0) {
      queue.enqueue(item);
    }
  }

  return queue.head();
}

console.log(delRing(arr))
```

**斐波那契数列（后一项是前两项之和）**
```
var fibonacci = function(n) {
  var queue = new Queue();
  queue.enqueue(1);
  queue.enqueue(1);

  var index = 0;
  while (index < n - 2) {
    var delItem = queue.dequeue();
    var headItem = queue.head();

    var nextItem = delItem + headItem;
    queue.enqueue(nextItem);

    index++;
  }

  queue.dequeue();
  return queue.head();
}

console.log( fibonacci(20) )
```

1. 两个队列实现一个栈
2. 杨辉三角
3. 用两个栈实现一个队列
4. 迷宫问题

## 数据结构之 - 树
