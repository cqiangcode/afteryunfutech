# CSS 相关的知识

1. vertival-align: 规范文本元素与在父元素中的垂直位置 [参考链接](http://www.w3school.com.cn/css/pr_pos_vertical-align.asp)
```css
  .container {
      vertical-align: baseline;
      /* text-top | text-bottom 元素顶端或底端与相应的父元素字体的顶端或底端 */
  }
```

2. flex 布局

```
  容器六个属性:
    1. flex-direction: row | row-reverse | column | column-reverse 项目排列方式
    2. flex-wrap: owrap | wrap | wrap-reverse 规定主轴排不下的换行方式
    3. flex-fow: 上两个的简写
    4. justify-content: flex-start | flex-end | center | space-between | space-around 主轴上的排列方式
    5. align-items: flex-start | flex-end | center | baseline | stretch(默认) 交叉轴的对其方式
```

```
  容器项目六个属性:
    1. order: 数值越小越靠前 项目的排列方式
    2. flex: 0 1 auto | auto (1 1 auto) | none (0 0 auto) 伸展 收缩 项目的大小 (伸展和收缩都是基于多余或者缺失空间进行的)
    3. align-self: auto | flex-start | flex-end | center | baseline | stretch 设置项目自己的交叉轴对其方式
```

3. css选择器 | 浏览器解析 CSS 选择器是 从右至左

```
  标签选择       span
  id 选择器      #app
  class 选择器   .wrap
  后代选择器     #app span .wrap
  子代选择器     div > p
  相邻兄弟选择器 div + p 紧跟在 div 后的 p
  分组选择器     div, p
  通配符选择器   *
  属性选择器     img[class="app"]
  伪类选择器     a:link
  伪元素选择器   a::before
```

```
  伪类选择器:
    p:first-child 找到父级元素中第一个是 p 标签的
  伪元素选择器:
    p:first-of-type
    p:nth-child(n)   找到父元素的第 n 个 元素子节点且正好是 p 标签
    p:nth-of-type(n) 找到父元素的第 n 个 p 标签
```

4. 单行 | 多行 文本溢出显示省略号

```css
.singleLine {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: no-wrap;
}
.multiLine {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
```

