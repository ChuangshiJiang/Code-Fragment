# JavaScript 常见问题和处理方法

标签（空格分隔）： js

---
### 1. 地址栏中文字符，使用 `getQueryStringByName()`方法获取会乱码。
```javascript
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
        <i class="fa fa-angle-up"></i> <!--图标--->
        <!--标题栏--->
    </dt>
    <dd>
        具体内容1
    </dd>
</dl>
<dl class="opened">
    <dt>
        标题
        <i class="fa fa-angle-up"></i> <!--图标--->
        <!--标题栏--->
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

### 4. 使用正则表达式验证纯数字
```
<input type="text" id="number" maxlength="8" onkeyup="value=value.replace(/[^\d]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" />
```

### 5. DataTables 控制行的隐藏或显示
```javascript
var showOrNot = function(){
    return false;//隐藏
    // return true //显示
}
"columns":[
    {"data":"xxx","title":"xxx","render":"xxx","bVisible":showOrNot}
]
```

### 6. 项目上传 Excel 表格
在 Upload.cshtml 页面修改：
```
@using(Html.BeginForm('接口','接口分类',...)); 
// 接口 和 接口分类 都可以改动
//每个上传按钮对应要有一个页面，页面名称与接口相同，页面与 Upload.cshtml 类似
```

### 7. 项目上传 Excel 表格
`<button type="button" onClick="location.href='要下载文件的地址'">点击下载</button>`

### 8. DataTables 表格重绘事件
```
$("#...").DataTable({...}).on("draw",function(){
    //表格重绘时需要做的操作
});
```

### 9. BootStrap 模态框获取触发元素的缓存值
```javascript
$("#...").on("show.bs.modal",function(event){
    let btnThis = $(event.relatedTarget);   //触发事件的元素
    let modal = $(this);  //模态框自身
    let data1 = btnThis.data("xxx"); //从按钮的 data-xxx 获取的值，data-xxx 中 ，xxx 必须小写
    let data2 = btnThis.data("xxx");
    //...
    modal.find("...").val("...");   //将触发元素的值填充到模态框对应元素    
});

//注意：触发元素上需要已经存在 data-xxx 的属性，且 xxx 推荐全部小写，否则浏览器也将自动转化成小写
//获取时一定要小写
```

### 10. windows 桌面环境下用 .bat 脚本打开浏览器到指定链接的方法及问题

### 11. jQuery 给一个元素绑定两个事件的写法
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

### 11. DataTables 加载本地数据
```javascript
var refreshData = function(){
    let data = "";  //本地数据
    table.clear().rows.add(data).draw();
    //table:要刷新的表格
};
```

### 12. Bootstrap popover 应用与页面动态元素
```javascript
let stock = function(){
    let content = '';
    content += '...';
    //...
    content += 
        '<div class="text-right">'+
        '<a class="popoverTrigger" title="单据详情" '+
        'data-container="body" data-toggle="popover" '+
        ' data-placement="right">...</a>'+
        '</div>';
        /*bootstrap 弹出框组件加载*/
        $("[data-toggle='popover']").popover({
            html:true
        });
        return content;
};
//其他各插件（如：datepicker,dateTimePicker 等）应用于动态元素，和 popover 一样，在拼接元素之后就立即注册事件
```

### 13. css 鼠标悬浮才显示的样式
**`要求实现`：正常情况下，a 链接不显示，只有鼠标移到到上面或者 a  的父元素上才显示**
*html 代码*
```html
<div>
    <span class="text-right">
        <a>详情</a>
    </span>
</div>
```

*css 代码*
```css
.text-right a{
    color:transparent;  /*透明无颜色*/
}
div:hover a{
    color:#333; /*鼠标悬浮时要显示的颜色*/
    cursor:pointer;
}
```

### 14. 数组排序
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

### 15. 对象属性排序
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

### 16. 输入框（连续）回车事件
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

### 17. layer 加载层的关闭
*如果调用服务器接口获取数据有延迟，可以使用 layer.load() 来添加加载动画，增加页面的交互性*
```javascript
$(document).on("click",".lockItem",function(){
    let itemId = $(this).data("itemid");
    layer.load();   //展示默认加载层
    setTimeout(function(){
        //必须使用延时函数才能开始加载动画
        let result = Auto.AjaxAgent.Bill.Lock...(itemId);//假设该接口会延迟 20s 返回结果
        layer.closeAll("loading");  //一接收到返回数据就关闭加载层
        if(result.IsSuccess){
            layer.msg(result.Info,{icon:1});
        }else{
            layer.msg(result.Info,{icon:7});
        }
    },10);
});
```

### 18. 一个正确返回字符串长度的函数
```javascript
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

var s = '𠮷𠮷';

s.length // 4
codePointLength(s) // 2
```

