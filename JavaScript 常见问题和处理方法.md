---
title: "Hi there"
output: pdf_document
---

#JavaScript 笔记
### 1. 地址栏中文字符，使用 `getQueryStringByName()`方法获取会乱码。
```javascript
/*
* 获取地址栏指定参数值
* name:String 类型，需要获取的参数键
*/
function getQueryStringByName(name) {
    var result = location.href.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

var string = getQueryStringByName("参数");
var newStr = decodeURI(string); //解码
    //编码encodeURI("需要编码的字符串");
```
### 2. “手风琴”样式的收起和放下
*html文档*
```html
<dl class="opened">
    <dt>
        标题
        <i class="fa fa-angle-up"></i> <!--图标-->
        <!--标题栏-->
    </dt>
    <dd>
        具体内容1
    </dd>
</dl>
<dl class="opened">
    <dt>
        标题
        <i class="fa fa-angle-up"></i> <!--图标-->
        <!--标题栏-->
    </dt>
    <dd>
        具体内容2
    </dd>
</dl>
......
```
*javascript处理*
```javascript
//点击 dt 收起/放下 内容,使用 jQuery 的方法
$(document).on("click", "dt", function () {
    let _this = $(this),
        openState = _this.parent("dl").hasClass("opened");//菜单是否展开
    if (openState) {
        //展开 ---> 闭合
        _this.find("i").removeClass("fa-angle-down").addClass("fa-angle-up");
        _this.next("dd").slideUp();
        _this.parent("dl").removeClass("opened");
    } else {
        //闭合 ---> 展开
        _this.find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
        _this.next("dd").slideDown();
        _this.parent("dl").addClass("opened");

    }
});
```

### 3. 浏览器标签图标
`<link rel="shortcut icon" type="iamge/x-icon" href="...">`其中"..."为选用图标的地址


### 4. 项目上传 Excel 表格
在 Upload.cshtml 页面修改：
```
@using(Html.BeginForm('接口','接口分类',...)); 
// 接口 和 接口分类 都可以改动
//每个上传按钮对应要有一个页面，页面名称与接口相同，页面与 Upload.cshtml 类似
```

### 5. 项目下载 Excel 表格
`<button type="button" onClick="location.href='要下载文件的地址'">点击下载</button>`


### 6. windows 桌面环境下用 .bat 脚本打开浏览器到指定链接的方法及问题

### 7. jQuery 给一个元素绑定两个事件的写法
```javascript
$("要绑定的元素").on({
    event1:function(){
        //事件1
    },
    event2:function(){
        //事件2
    },
    //...
    eventn:function(){
        //事件n
    }
});
```

### 8. 数组排序
```javascript
function compare(a,b){
    let c = a<b?-1:(a>b?1:0);
    return c;
}

function compareByOrder(order){
    order = String(order);
    return function(a,b){
        switch(order){
            case "desc":    //降序
            return a<b?1:(a>b?-1:0);
            break;
            case "asc":    //升序
            return a<b?-1:(a>b?1:0);
            break;
            default:
            break;
        }
    }
}

let arr = [1,10,100,2,20];
arr.sort(); //[1,2,10,20,100] 使用数组默认排序方法，会先将数组元素转成字符形式，然后比较
arr.sort(compare);  //[1,2,10,20,100]
arr.sort(compareByOrder("desc")); // [100,20,10,2,1]
//也可以降序排列
```

### 9. 对象属性排序
```javascript
function compare(prop,order){
    prop = String(prop),order = String(order);
    return function(obj1,obj2){
        let val1 = obj1[prop],val2 = obj2[prop];
        switch(order){
            case "desc":    //降序
            return val1 < val2 ? 1 : ( val1 > val2 ? -1 : 0 );
            break;
            case "asc":    //升序
            return val1 < val2 ? -1 : ( val1 > val2 ? 1 : 0 );
            break;
            default:
            break;
        }
    }
}

let personA = { name:'Jack',age:27 };
let personB = { name:'Tom',age:30 };
let arr = [personA,personB];

arr.sort(compare('name','desc'));   //[{name:'Tom',age:30},{name:'Jack',age:27}]
arr.sort(compare('age','desc'));    //[{name:'Tom',age:30},{name:'Jack',age:27}]
arr.sort(compare('name','asc'));    //[{name:'Jack',age:27},{name:'Tom',age:30}]
```

### 10. 输入框（连续）回车事件
```javascript
let inputs = $("input");    //all input elements on the page

$("input").on("keyup",function(event){
    ClickEnter(event,inputs);
});

function ClickEnter(event,inputs){
    let _this = $(event.target),
        inputsLength = inputs.length - 1,
        indexThis = inputs.index(_this);
    if((event.keyCode || event.which) == 13){
        if(indexThis < inputsLength){
            inputs[indexThis+1].focus();
        }else{
            //最后一个输入框的操作
        }
    }
}
```

### 11. 序列化表单
```javascript
/*
* 序列表单
* $.fn.functionName :扩展 jQuery 函数库，添加一个名为 functionName 的函数
*/
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
```

### 12.反序列化表单
```javascript
/*
* 反序列表单
* $.fn.functionName :扩展 jQuery 函数库，添加一个名为 functionName 的函数
*/
$.fn.DeserializeObject = function (model) {
    var rootDom = this;
    for (var p in model) {
        var targetDom = rootDom.find("[name=" + p + "]");
        if (targetDom.is("input[type='radio']")) {
            targetDom.each(function () {
                if ($(this).is("[value=" + model[p] + "]")) {
                    $(this).prop('checked', true);
                    return false;
                }
            });
        } else if (targetDom.is("input[type='checkbox']")) {
            targetDom.each(function () {
                if ($(this).is("[value=" + model[p] + "]")) {
                    $(this).attr('checked', true);
                    return false;
                }
            });
        } else if (targetDom.is("select")) {
            targetDom.each(function () {
                $(this).find("option[value=" + model[p] + "]").prop("selected", true);
                return false;

            })

        } else if (targetDom.hasClass("datepicker")) {
            targetDom.val(jsonDateFormat(model[p]));
        } else {
            targetDom.val(model[p]);
        }

    }
}
```


### 13. 浏览窗口打印部分内容，保持原页面不变
*html 代码*
```html
<iframe id="printf" src="" width="0" height="0" frameborder="0"></iframe>
```
*JavaScript 代码*
```javascript
/*真实打印的条码单据*/
function doBarCodePrint() {
    var headhtml = 
    '<html><head><title></title><style> '+
    'body{width:100mm;} '+
    '.page {height:71mm;overflow:hidden;} .page div {width:46%;float:left;line-height:8mm;padding-left: 3mm;} '+
    '.page div:nth-child(1) {border: 1px solid #ccc;width: 95.2%;}  '+
    '.packageNum{width: 25% !important;text-align: center;padding-left: 0 !important;font-weight: bold;height: 31.2mm;}  '+
    '.packgeNumNum{width: 100% !important;line-height:25mm !important;display: block;font-size: 45px;text-align: center;border:0 !important;padding-left: 0 !important;border-top: 1px solid #ccc !important;}  '+
    '.page div:nth-of-type(2n) { border-left:1px solid #ccc; border-bottom:1px solid #ccc;border-right:1px solid #ccc;}  '+
    '.page div:nth-of-type(2n+1) { border-bottom:1px solid #ccc;border-right:1px solid #ccc;} .barCodeImg{width:70%!important;text-align:center;height: 118.91px;}  '+
    '.barCodeImg img{width:74.5% !important; margin-top:2px;}   '+
    '.page .coreLineheight{line-height:6mm;}  '+
    '.jianju{ width:24.6% !important; border-left:0 !important; white-space:nowrap; padding-left:0px !important; } '+
    '</style></head><body>';//css 样式表

    var foothtml = "</body></html>";
    
    // 获取 div 中的 html
    var newhtml = $("#barcode").html();
    var printhtml = headhtml + newhtml + foothtml;//拼接需要打印的内容，带上样式表

    // 生成并打印ifrme  
    var f = document.getElementById('printf');
    f.contentDocument.write(printhtml);
    f.contentDocument.close();
    f.contentWindow.print();
    return false;
}

//点击打印按钮，打印条形码
$(document).on("click", "#printBarCode", function () {
    $("#seeBarCodeModal").modal("hide");
    doBarCodePrint();
})
```

*实例动图*
![打印条形码动图](/img/barCodePrint.gif)

**可见取消打印后，原页面没有发生变化 参考 [ Window.print()打印整个网站中的部分内容，打印后，原网页保持不变](https://segmentfault.com/a/1190000006236133)**

### 14. JSON 日期格式化
```javascript
/*
* json日期格式转换为正常格式:不带时分秒
*/

function jsonDateFormat(jsonDate) {
    try {
        if (jsonDate == "") {
            return "";
        }
        var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "-" + month + "-" + day;
    } catch (ex) {
        return "";
    }
}

/*
* json日期格式转换为正常格式:带时分秒
*/
function jsonDateTimeFormat(jsonDate) {
    try {
        if (jsonDate == "") {
            return "";
        }
        var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        var milliseconds = date.getMilliseconds();
        return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    } catch (ex) {
        return "";
    }
}
```
*如图*

![JSON日期格式化](/img/JSON日期格式化.png)

****

### 15. form 表单的 rest() 方法
**注意事项：** 页面中不能有 `id` 或者 `name`属性 为 `reset` 的其他元素，否则会导致 `.reset()` 报错为`undefined`

---

### 16. jquery 获取 outerHtml 包含当前节点本身的代码
在开发过程中，`jQuery.html()` 是获取当前节点下的html代码，并不包含当前节点本身的代码，然后我们有时候确需要，找遍jQuery api文档也没有任何方法可以拿到。

看到有的人通过`parent().html()`，如果当前元素没有兄弟元素还行，如果有那就行不通了。后来实验发现有一个jQuery的一个方法可以解决，而且非常简便，如下：

`jQuery.prop("outerHTML");`
```html
<div class="test"><p>hello，你好！</p></div>
<script>
    $(".test").prop("outerHTML");
</script>
```
**输出结果为：**`<div class="test"><P>hello,你好！</p></div>`

---

### 17. Javascript 原型链
#### 17.1 普通对象与函数对象
`JavaScript` 中万物皆对象！但对象也是有区别的。分为普通对象和函数对象，`Object` 、`Function` 是 JS 自带的函数对象。
```javascript
var o1 = {}; 
var o2 =new Object();
var o3 = new f1();

function f1(){}; 
var f2 = function(){};
var f3 = new Function('str','console.log(str)');

console.log(typeof Object); //function 
console.log(typeof Function); //function  

console.log(typeof f1); //function 
console.log(typeof f2); //function 
console.log(typeof f3); //function   

console.log(typeof o1); //object 
console.log(typeof o2); //object 
console.log(typeof o3); //object
```
在上面的例子中 `o1 o2 o3` 为普通对象，`f1 f2 f3` 为函数对象。怎么区分，其实很简单，凡是通过 `new Function()` 创建的对象都是函数对象，其他的都是普通对象。`f1`,`f2`,归根结底都是通过 `new Function()`的方式进行创建的。`Function Object` 也都是通过 `New Function()`创建的。

#### 17.2 构造函数
```javascript
function Person(name, age, job) {
 this.name = name;
 this.age = age;
 this.job = job;
 this.sayName = function() { alert(this.name) } 
}
var person1 = new Person('Zaxlct', 28, 'Software Engineer');
var person2 = new Person('Mick', 23, 'Doctor');
```
上面的例子中 person1 和 person2 都是 Person 的实例。这两个实例都有一个 constructor （构造函数）属性，该属性（是一个指针）指向 Person。 即：
```javascript
console.log(person1.constructor == Person); //true
console.log(person2.constructor == Person); //true
```
我们要记住两个概念（构造函数，实例）：
**person1 和 person2 都是 构造函数 Person 的实例**
一个公式：
**实例的构造函数属性（constructor）指向构造函数。**

#### 17.3 原型对象
在 `JavaScript` 中，每当定义一个对象（函数也是对象）时候，对象中都会包含一些预定义的属性。其中每个**函数对象**都有一个`prototype` 属性，这个属性指向函数的**原型对象**。
```javascript
function Person() {}
Person.prototype.name = 'Zaxlct';
Person.prototype.age  = 28;
Person.prototype.job  = 'Software Engineer';
Person.prototype.sayName = function() {
  alert(this.name);
}
  
var person1 = new Person();
person1.sayName(); // 'Zaxlct'

var person2 = new Person();
person2.sayName(); // 'Zaxlct'

console.log(person1.sayName == person2.sayName); //true
```
我们得到了本文第一个 **「定律」** ：
`每个对象都有 __proto__ 属性，但只有函数对象才有 prototype 属性`

那什么是**原型对象**呢？
```javascript
Person.prototype = {
   name:  'Zaxlct',
   age: 28,
   job: 'Software Engineer',
   sayName: function() {
     alert(this.name);
   }
}
```
.
.
.
原型对象，顾名思义，它就是一个普通对象。从现在开始你要牢牢记住原型对象就是 `Person.prototype` ，如果你还是害怕它，那就把它想想成一个字母 A： `var A = Person.prototype`

#### 17.4 __proto__
>`JS`在创建对象（不论是普通对象还是函数对象）的时候，都有一个叫做 `__proto__` 的内置属性，用于指向创建它的构造函数和原型对象
对象 person1 有一个 `__proto__`属性，创建它的构造函数是 Person，构造函数的原型对象是 `Person.prototype` ，
所以：
`person1.__proto__ == Person.prototype //true`
*如下图：*
![原型链《JavaScript 高级程序设计》的图 6-1](/img/原型链.jpg)
*详情参见* [最详尽的 JS 原型...](https://www.jianshu.com/p/dee9f8b14771)
---
### 18. JavaScript中函数的调用
>调用一个函数将暂停当前函数的执行，传递控制权和参数给新函数。除了声明时定义的形式参数，每个函数接收两个附加的参数：`this` 和 `arguments`. 参数 `this` 在面向对象编程中非常重要，它的值取决于调用的模式。在`JavaScript`中一共有 4 种调用模式：方法调用模式，函数调用模式，构造器调用模式和 `apply` 调用模式。这些模式在如何初始化关键参数`this`上存在差异。
#### 18.1 方法调用模式
>当一个函数被保存为对象的一个属性时，我们称它为一个方法。当一个方法被调用时，this 被绑定到该对象。

#### 18.2 函数的返回
>当一个函数被调用时，它从第一个语句开始执行，并且在遇到关闭函数体的 `}` 时结束。那使得函数把控制权交还给调用该函数的程序部分。

>`return`语句可以使函数提前返回。当 `return`被执行时，函数立即返回而不再执行余下语句。

>一个函数总是会返回一个值。如果没有指定返回值，则返回 `undefined` 。
如果函数在前面加上 `new` 前缀的方式来调用，且返回值不是一个对象，则返回 `this` （该新对象）

### 19. JavaScript 的数组
>数组是一段线性分配的内存，它通过整数去计算偏移并房问其中的元素。数组可以是很快的数据结构。不幸的是，JavaScript没有像数组一样的数据结构。反而，JavaScript提供了一种拥有一些类数组（array-like)特性的对象。它把数组的下标转变成字符串，用其作为属性。它明显地比一个真正的数组慢，但它可以更方便地使用。属性的检索和更新的方式与对象一模一样，除了有一个可以用整数作为属性名的特性外。数组有它们自己的字面量格式。数组也有一套非常有用的内置方法。

### 20. 