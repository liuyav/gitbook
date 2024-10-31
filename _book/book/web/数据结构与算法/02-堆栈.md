# 栈的概念
栈是一种特殊的线性表，仅能在栈顶进行操作，有着后进先出的特性

## 栈的实现方式
1. 数组
2. 链表

## 栈的方法
1. push()，添加一个元素到栈
2. pop()，弹出栈顶元素
3. top()，返回栈顶元素
4. isEmpty()，判断栈顶是否为空
5. size()，返回栈的元素个数
6. clear()，清空栈

## 数组实现栈
```
function Stack() {
  var items = [];

  this.push = function(item) {
    items.push(item);
  }

  this.pop = function() {
    return items.pop();
  }

  this.top = function() {
    return items[items.length - 1];
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
}
```

## 栈的应用
**合法括号判断**
```
var str = '(sssd(sss)ss(aadaf))';
var str2 = '(asdasd)(asd)sad)adsad(asd';

var isLeaglBrackets = function(string) {
  var stack = new Stack();
  for (var i = 0, len = string.length; i < len; i++) {
    var item = string[i];
    
    if (item === '(') {  // 左括号入栈
      stack.push(item);
    } else if (item === ')') {
      if (stack.isEmpty()) { // 遇到右括号栈为空，说明没有抵消的
        return false;
      } else { // 遇到右括号，栈不为空，可以抵消（但不一定抵消完栈里面的）
        stack.pop();
      }
    }
  }

  // for 循环完毕的时候判断，如果栈为空，说明抵消完成，合法；否则，不合法。
  return stack.isEmpty();
}

console.log( isLeaglBrackets(str) )
console.log( isLeaglBrackets(str2) )
```

**逆波兰表达式**

也叫后缀表达式，例如将 (a + b) x (c + d) 转为 ab + cd + x;

示例: ["4", "13", "5", "/", "+"] 想当于 4 + (13 / 5) = 6;

```
var exp = ["4", "13", "5", "/", "+"];

var calcExp = function(exp) {
  var stack = new Stack();

  for (var i = 0, len = exp.length; i < len; i++) {
    var item = exp[i];
    if (['+', '-', '*', '/'].indexOf(item) >= 0) {
      var val1 = stack.pop();
      var val2 = stack.pop();
      var result = parseInt(eval(val2 + item + val1));
      stack.push(result.toString());
    } else {
      stack.push(item);
    }
  }

  return stack.pop();
}

console.log( calcExp(exp) )
```

## 栈的算法题
**实现一个 min 方法，返回栈的最小元素，且时间复杂度为 o(1);**

```
function MinStack() {
  var dataStack = new Stack();
  var minStack = new Stack();

  this.push = function(item) {
    if (minStack.isEmpty() || item < minStack.top()) {
      minStack.push(item);
    } else {
      dataStack.push(item);
    }
  }

  this.min = function() {
    return minStack.pop();
  }
}

var minStack = new MinStack();
minStack.push(8);
minStack.push(3);
minStack.push(4);

console.log( minStack.min() )
```

**使用栈，完成中序表达式转后序表达式。**

## 案例
1. 编辑器撤销、恢复操作
