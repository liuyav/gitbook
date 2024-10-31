## 链表
1. 物理储存单元非连续、非顺序的储存结构，由一系列节点构成
2. 节点用来存储数据。一部分是存储数据的数据域，一个部分是存储指向下一个节点的指针域

## 相关概念
1. 首尾节点
  - 链表中第一个节点是首节点，最后一个节点是尾节点
2. 有头链表与无头链表
  - 无头链表指的是第一个节点既有指针域，又有数据域，第一个节点既是首节点，又是头节点。
  - 有头链表指的是第一个节点只有指针域，没有数据域。

## 链表相关生活例子
1. 猴子捞月

## 定义链表类
```
function LinkList() {
  var Node = function(data) {
    this.data = data;
    this.next = null;
  }

  var length = 0;
  var head = null;  // 头节点
  var tail = null;  // 尾节点
}
```
定义节点类，接收一个data参数，指定数据域属性，在指定指针域属性，当链表为空的时候，length为0，头节点和尾节点为空，新增节点后，head指向头节点，tail指向尾节点。

## 链表方法
1. append，添加一个新的元素
2. insert，在指定位置插入一个元素
3. remove，删除指定位置的元素
4. remove_head，删除首节点
5. remove_tail，删除尾节点
6. indexOf，返回指定位置的索引
7. get，返回指定位置的元素
8. head，返回头节点
9. tail，返回尾节点
10. length，返回链表长度
11. isEmpty，判断链表是否为空
12. clear，清空链表
13. print，打印整个链表

## append 方法
```
function LinkList() {
  var Node = function(data) {
    this.data = data;
    this.next = null;
  }

  var length = 0;
  var head = null;
  var tail = null;

  // 添加节点
  // 1. 修改最后一个节点的指针域（指向新节点）
  // 2. 修改最后一个节点的数据域为新节点
  // 3. 更新 length 属性
  this.append = function(data) {
    var newNode = new Node(data);

    if (head == null) {
      head = newNode;
      tail = newNode;
    } else {
      // 将指针域指向新节点，修改尾节点为新节点（先修改指针域）
      tail.next = newNode;
      tail = newNode
    }

    length += 1;

    return true;
  };
}
```

## print 方法
```
function LinkList() {
  var Node = function(data) {
    this.data = data;
    this.next = null;
  }

  var length = 0;
  var head = null;
  var tail = null;

  this.print = function() {
    // 当前节点为头节点
    var curNode = head;

    while (curNode) {
      console.log(curNode.data);
      // 移动指针到下一个节点
      curNode = curNode.next; 
    }
  };
}

var link = new LinkList();

link.append(2);
link.append(3);
link.append(5);

link.print();
```

## insert 方法
```
function LinkList() {
  var Node = function(data) {
    this.data = data;
    this.next = null;
  }

  var length = 0;
  var head = null;
  var tail = null;


  this.insert = function(index, data) {
    if (index < 0 || index > length) {
      return false;
    } else if (index === length) {
      return this.append(data);
    } else {
      var newNode = new Node(data);

      if (index === 0) {
        newNode.next = head;
        head = newNode;
      } else {
        var insertIndex = 1;

        var curNode = head;

        // 找到插入节点的上一个节点
        while (insertIndex < index) {
          insertIndex += 1;
          curNode = curNode.next;
        }

        var nextNode = curNode.next;
        curNode.next = newNode;
        newNode.next = nextNode;

        length += 1;

        return true;
      }
    }
  };
}

var link = new LinkList();

link.append(2);
link.append(3);
link.append(5);

link.insert(2, 4)

link.print();
```

## remove 方法
```
function LinkList() {
  var Node = function(data) {
    this.data = data;
    this.next = null;
  }

  var length = 0;
  var head = null;
  var tail = null;

  // 删除 index 位置的元素就是把 index 前一个的 next 指向被删除元素的 next;
  this.remove = function(index) {
    if (index < 0 || index >= length) {
      return null;
    } else {
      var delNode = null;

      // 第一个节点被删除，指针往前移动一个
      if (index === 0) {
        delNode = head;
        head = head.next;
      } else {
        var delIndex = 0;
        var preNode = null;
        var curNode = head;

        while (delIndex < index) {
          delIndex += 1;
          preNode = curNode;
          curNode = curNode.next;
        }

        delNode = curNode;
        preNode.next = curNode.next;

        if (curNode.next === null) {
          tail = preNode;
        }
      }
      
      length -= 1;
      delNode.next = null;
      return delNode.data;
    }
  };
}

var link = new LinkList();

link.append(2);
link.append(3);
link.append(5);

link.remove(2)

link.print();
```

### get 方法
```
function LinkList() {
  var Node = function(data) {
    this.data = data;
    this.next = null;
  }

  var length = 0;
  var head = null;
  var tail = null;

  this.get = function(index) {
    if (index < 0 || index >= length) {
      return null;
    } else {
      var curIndex = 0;
      var curNode = head;

      while(curIndex < index) {
        curIndex += 1;
        curNode = curNode.next;
      }

      return curNode.data;
    }
  }
}


link.append(2);
link.append(3);
link.append(5);

link.get(2)

link.print();
```


## 链表常见面试题
链表反转（迭代和递归两种方法实现）
双向链表

## 迭代翻转链表
```
function Node(data) {
  this.data = data;
  this.next = null;
}

var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

function print(node) {
  var curNode = node;
  while(curNode) {
    console.log(curNode.data);
    curNode = curNode.next;
  }
}

function reverseInte(head) {
  if (!head) {
    return null;
  }

  var prevNode = null; 
  var curNode = head;

  while(curNode) {
    var nextNode = curNode.next;
    curNode.next = prevNode;
    prevNode = curNode;
    curNode = nextNode;
  }

  return prevNode;
}

print( reverseInte(node1) )
```

## 递归翻转链表
```
function Node(data) {
  this.data = data;
  this.next = null;
}

var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

function print(node) {
  var curNode = node;
  while(curNode) {
    console.log(curNode.data);
    curNode = curNode.next;
  }
}

function reverseDiGui(head) {
  if (!head) {
    return null;
  }

  if (head.next === null) {
    return head;
  }

  var newHead = reverseDiGui(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
}

print( reverseDiGui(node1) )

```