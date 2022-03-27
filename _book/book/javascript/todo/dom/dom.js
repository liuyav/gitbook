var dom = {
  // 取得样式表对象2
  getSheet: function(ele) {
    return ele.sheet || ele.styleSheet;
  },
  // 取得每条规则
  getRule: function(sheet) {
    return sheet.cssRules || sheet.rules;
  },
  // 创建规则
  createRule: function(sheet, selector, style, pos) {
    return sheet.insertRule(selector + "{" + style + "}", pos) || sheet.addRule(selector, style, pos);
  }
  // 删除规则
  removeRule: function(sheet, pos) {
    sheet.deleteRule(pos) || sheet.removeRule(pos)
  }
  // 获取最终样式
  getStyle: function(ele, attr) {
    if (ele.currentStyle) {
      return ele.currentStyle[attr];
    } else {
      return document.defaultView.getComputedStyle(ele, null)[attr];
    }
  }
}