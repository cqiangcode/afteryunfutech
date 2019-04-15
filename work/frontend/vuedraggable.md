# cnpm install vuedraggable

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