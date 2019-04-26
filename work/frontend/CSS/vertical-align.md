# vertical-align 和 line-height

1. 基本概念
```json
  {
      "baseline": "字母 x 的底部所在位置",
      "inline-box": "行内框",
      "line-box": "行框, 高度为本行内所有行内框最大的值",
      "line-height": "两行元素基线间的距离",
      "font-size": "字体的高度",
  }
```
2. inline-box 的模样
```
  行内框基本样式: (行高 - fontSize) / 2
    半行距
    顶线: 文本顶端
    中线: 字母 X 交叉位置
    基线: 字母 X 底部
    底线：文本底端
    半行距
```
3. 在 line-box 中的所有 inline-boxes 定位中, 判断逻辑是
```
  line-box 下面的 inline-boxes 定位问题
    1. 先查找本行中所有不用 vertical-align 的元素，若没有，则默认写一个 X
    2. 以其基线将其他元素的基线与之对齐，设置了 vertical-align 的用元素中间与所设值对齐
    3. 若存在只存在 line-height, 则外标签的宽度在此之上拓展
    4. 若存在只存在 height, 则在对齐过程中调整基准线的位置
    5. 若都存在, 以 line-height 为基准，其他元素若超出则超出显示
```
4. 块级元素中的基线定位是由最底行的基线为准的
```
  意思是 一个 block 或者 inline-block 的元素其对外部来说其基线是最下面的基准线
```
5. 不同的 bfc 区域则不受外部基线等的影响