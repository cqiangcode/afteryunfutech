# cnpm install vuedraggable 

* 目前会遇到 事件的 to 属性不指向真正的 element，暂不使用

```html
  <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
   <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
  </draggable>
```
```js
  // draggable 属性问题
  const options = {
      "sort": false, // 元素内是否排序
      "disabled": false, // 是否禁止拖动
      "methods": {
          end() {
              // 放下拖拽物触发的事件
          }
      }

  }
```