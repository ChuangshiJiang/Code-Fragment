# JavaScript 常见问题和处理方法

标签（空格分隔）： js

---
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


