# DOM 相关整理

## 富文本编辑框

```html
  <!-- contenteditable 使 div 变得可编辑 -->
  <div contenteditable="true"></div>
  <!-- 可编辑区域可以通过 document.execCommand 实现富文本编辑效果 -->
```

## document.getSelection() | window.getSelection()

```js
  document.getSelecton().getRangeAt({
    startOffset,
    endOffset,
    startContainer,
    endContaner
  })
```