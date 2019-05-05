# python3 简单学习

## 基本数据类型 | 自带 type(a) 可以检测 | isinstance(a, int)

1. 不可变数据： Number ， String ， Tuple(元组)
```python
  # Number 分为 int float bool complex
  # True False 本质为 1, 0
  a = 20, b = 5.5, c = True, d = 4 + 3j || complex(4, 3)
  a / b # 结果为浮点数 
  a // b # 结果为整数
```
```python
  # String | + 是连接字符串 | * 复制字符串
  str = 'hello world'
  str[0: -1] || str[1:] # 不包括 -1 字符 || 截掉第一个字符
  print(r'Ru\noob') # r 代表原始字符串
```
```python
  # Tuple | 元素不可修改
  tuple = ('abcd', 786, 2.23, 'runoob', 70.2)
  tuple + tuple || tuple * 2
  tuple(1,) # 单个元素要加 ,
```
2. 可变数据： List(列表) , Dictionary(字典) , Set(集合)
```python
  # List | + 连接数组 | * 复制数组
  # 下标规则基本同上
  # 截取可以设置步长
  letters = ['c', 'h', 'e', 'c', 'k', 'i', 'o']
  letters[1:4:2] # 截取为 'h', 'c'
```
```python
  # Set | 自动去重
  student = {'Tom', 'Jim', 'Mary', 'Tom', 'Jack', 'Rose'}
  a = set('abracadabra')
  b = set('alacazam')
  # 差集 || 并集 || 交集 ||   求亦或
  a - b || a | b || a & b || a ^ b
  # 成员测试
  if 'Rose' in student :
    print('Rose 在集合中')
  else :
    print('Rose 不在集合中')
```
```python
  # Dictionary | 无序键值对
  tinydict = {'name': 'runoob','code':1, 'site': 'www.runoob.com'}
  tinydict.keys() | tinydict.values()
```

## 运算符
```python
  ** # 幂运算符
```