### 14. JSON 日期格式化

```javascript
/*
 * json日期格式转换为正常格式:不带时分秒
 */

function jsonDateFormat(jsonDate) {
  try {
    if (jsonDate == '') {
      return ''
    }
    var date = new Date(
      parseInt(jsonDate.replace('/Date(', '').replace(')/', ''), 10)
    )
    var month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
  } catch (ex) {
    return ''
  }
}

/*
 * json日期格式转换为正常格式:带时分秒
 */
function jsonDateTimeFormat(jsonDate) {
  try {
    if (jsonDate == '') {
      return ''
    }
    var date = new Date(
      parseInt(jsonDate.replace('/Date(', '').replace(')/', ''), 10)
    )
    var month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var seconds =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    var milliseconds = date.getMilliseconds()
    return (
      date.getFullYear() +
      '-' +
      month +
      '-' +
      day +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds
    )
  } catch (ex) {
    return ''
  }
}
```

_如图_

![JSON日期格式化](/img/JSON日期格式化.png)

---

### 15. form 表单的 rest() 方法

**注意事项：** 页面中不能有 `id` 或者 `name`属性 为 `reset` 的其他元素，否则会导致 `.reset()` 报错为`undefined`

---

### 16. jquery 获取 outerHtml 包含当前节点本身的代码

在开发过程中，`jQuery.html()` 是获取当前节点下的 html 代码，并不包含当前节点本身的代码，然后我们有时候确需要，找遍 jQuery api 文档也没有任何方法可以拿到。

看到有的人通过`parent().html()`，如果当前元素没有兄弟元素还行，如果有那就行不通了。后来实验发现有一个 jQuery 的一个方法可以解决，而且非常简便，如下：

`jQuery.prop("outerHTML");`

```html
<div class="test"><p>hello，你好！</p></div>
<script>
  $('.test').prop('outerHTML')
</script>
```

**输出结果为：**`<div class="test"><P>hello,你好！</p></div>`

---

### 17. Javascript 原型链

#### 17.1 普通对象与函数对象

`JavaScript` 中万物皆对象！但对象也是有区别的。分为普通对象和函数对象，`Object` 、`Function` 是 JS 自带的函数对象。

```javascript
var o1 = {}
var o2 = new Object()
var o3 = new f1()

function f1() {}
var f2 = function() {}
var f3 = new Function('str', 'console.log(str)')

console.log(typeof Object) //function
console.log(typeof Function) //function

console.log(typeof f1) //function
console.log(typeof f2) //function
console.log(typeof f3) //function

console.log(typeof o1) //object
console.log(typeof o2) //object
console.log(typeof o3) //object
```

在上面的例子中 `o1 o2 o3` 为普通对象，`f1 f2 f3` 为函数对象。怎么区分，其实很简单，凡是通过 `new Function()` 创建的对象都是函数对象，其他的都是普通对象。`f1`,`f2`,归根结底都是通过 `new Function()`的方式进行创建的。`Function Object` 也都是通过 `New Function()`创建的。

#### 17.2 构造函数

```javascript
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function() {
    alert(this.name)
  }
}
var person1 = new Person('Zaxlct', 28, 'Software Engineer')
var person2 = new Person('Mick', 23, 'Doctor')
```

上面的例子中 person1 和 person2 都是 Person 的实例。这两个实例都有一个 constructor （构造函数）属性，该属性（是一个指针）指向 Person。 即：

```javascript
console.log(person1.constructor == Person) //true
console.log(person2.constructor == Person) //true
```

我们要记住两个概念（构造函数，实例）：
**person1 和 person2 都是 构造函数 Person 的实例**
一个公式：
**实例的构造函数属性（constructor）指向构造函数。**

#### 17.3 原型对象

在 `JavaScript` 中，每当定义一个对象（函数也是对象）时候，对象中都会包含一些预定义的属性。其中每个**函数对象**都有一个`prototype` 属性，这个属性指向函数的**原型对象**。

```javascript
function Person() {}
Person.prototype.name = 'Zaxlct'
Person.prototype.age = 28
Person.prototype.job = 'Software Engineer'
Person.prototype.sayName = function() {
  alert(this.name)
}

var person1 = new Person()
person1.sayName() // 'Zaxlct'

var person2 = new Person()
person2.sayName() // 'Zaxlct'

console.log(person1.sayName == person2.sayName) //true
```

我们得到了本文第一个 **「定律」** ：
`每个对象都有 __proto__ 属性，但只有函数对象才有 prototype 属性`

那什么是**原型对象**呢？

```javascript
Person.prototype = {
  name: 'Zaxlct',
  age: 28,
  job: 'Software Engineer',
  sayName: function() {
    alert(this.name)
  }
}
```

.
.
.
原型对象，顾名思义，它就是一个普通对象。从现在开始你要牢牢记住原型对象就是 `Person.prototype` ，如果你还是害怕它，那就把它想想成一个字母 A： `var A = Person.prototype`

#### 17.4 **proto**

> `JS`在创建对象（不论是普通对象还是函数对象）的时候，都有一个叫做 `__proto__` 的内置属性，用于指向创建它的构造函数和原型对象
> 对象 person1 有一个 `__proto__`属性，创建它的构造函数是 Person，构造函数的原型对象是 `Person.prototype` ，
> 所以：
> `person1.__proto__ == Person.prototype //true`
> _如下图：_
> ![原型链《JavaScript 高级程序设计》的图 6-1](/img/原型链.jpg)

## _详情参见_ [最详尽的 JS 原型...](https://www.jianshu.com/p/dee9f8b14771)

### 18. JavaScript 中函数的调用

> 调用一个函数将暂停当前函数的执行，传递控制权和参数给新函数。除了声明时定义的形式参数，每个函数接收两个附加的参数：`this` 和 `arguments`. 参数 `this` 在面向对象编程中非常重要，它的值取决于调用的模式。在`JavaScript`中一共有 4 种调用模式：方法调用模式，函数调用模式，构造器调用模式和 `apply` 调用模式。这些模式在如何初始化关键参数`this`上存在差异。

#### 18.1 方法调用模式

> 当一个函数被保存为对象的一个属性时，我们称它为一个方法。当一个方法被调用时，this 被绑定到该对象。

#### 18.2 函数的返回

> 当一个函数被调用时，它从第一个语句开始执行，并且在遇到关闭函数体的 `}` 时结束。那使得函数把控制权交还给调用该函数的程序部分。

> `return`语句可以使函数提前返回。当 `return`被执行时，函数立即返回而不再执行余下语句。

> 一个函数总是会返回一个值。如果没有指定返回值，则返回 `undefined` 。
> 如果函数在前面加上 `new` 前缀的方式来调用，且返回值不是一个对象，则返回 `this` （该新对象）

### 19. JavaScript 的数组

> 数组是一段线性分配的内存，它通过整数去计算偏移并房问其中的元素。数组可以是很快的数据结构。不幸的是，JavaScript 没有像数组一样的数据结构。反而，JavaScript 提供了一种拥有一些类数组（array-like)特性的对象。它把数组的下标转变成字符串，用其作为属性。它明显地比一个真正的数组慢，但它可以更方便地使用。属性的检索和更新的方式与对象一模一样，除了有一个可以用整数作为属性名的特性外。数组有它们自己的字面量格式。数组也有一套非常有用的内置方法。

### 20. 判断一个值是否是真正的数组

```javascript
var my_value
if (
  (my_value && typeof my_value === 'object' && typeof my_value.length =
    number && !my_value.propertyIsEnumerable('length'))
) {
  //my_value 确实是一个数组
}
```

### 21. 统计一段文本（英文）中每个单词出现的次数

```javascript
var i,
  word,
  text =
    'This oracle of comfort has no pleased me.That when I am in heaven I shall' +
    ' desire to see what this child does,and praise my Constructor.'
var words = text.toLowerCase().split(/[\s,.]+/)
var count = {}
for (i = 0; i < words.length; i++) {
  word = words[i]
  if (count[word]) {
    count[word] += 1
  } else {
    count[word] = 1
  }
}
```

这段代码的问题：

> 让我们来研究该结果，`count`（`this1`的值为 2，`count.heaven`的值是 1，但是`count.constructor`却包含着一个看上去令人不可思议的字符串（译注 7）。其原因在于`count` 对象继承自`object.prototype`，而`object.prototype` 包含着一个名为`constructor`的成员对象，它的值是一个`object`。`+=` 运算符，就像`+` 运算符一样，当它的双运算数不是数字时会执行字符申连接的操作而不是做加法。因为该对象是一个函数，所以`+=` 运算符将其转换成一个英名其妙的字符串，然后再把一个数字 1 加在它的后面。我们可以采用处理`for in`中的问题的相同方法去避免类似的问题：用`hasownProperty`方法检测成员关系，或者查找特定的类型。在当前情形下，我们对似是而非的 `count [word]`的测试条件不够具体（译注 8)。应该像下面这样：

```javascript
var i,
  word,
  text =
    'This oracle of comfort has no pleased me.That when I am in heaven I shall' +
    ' desire to see what this child does,and praise my Constructor.'
var words = text.toLowerCase().split(/[\s,.]+/)
var count = {}
for (i = 0; i < words.length; i++) {
  word = words[i]
  if (count.hasOwnProperty(word)) {
    if (count[word]) {
      count[word] += 1
    } else {
      count[word] = 1
    }
  }
}
```
