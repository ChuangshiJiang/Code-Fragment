

### 1. BootStrap 模态框获取触发元素的缓存值
```javascript
$("#...").on("show.bs.modal",function(event){
    let btnThis = $(event.relatedTarget);   //触发事件的元素
    let modal = $(this);  //模态框自身
    let data1 = btnThis.data("xxx"); //从按钮的 data-xxx 获取的值，data-xxx 中 ，xxx 必须小写
    let data2 = btnThis.data("xxx");
    //...
    modal.find("...").val("...");   //将触发元素的值填充到模态框对应元素    
});
//注意：触发元素上需要已经存在 data-xxx 的属性，且 xxx 推荐全部小写，
//否则浏览器也将自动转化成小写
//获取时一定要小写
```

### 2. Bootstrap popover 应用与页面动态元素
#### 2.1 动态加载
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
//其他各插件（如：datepicker,dateTimePicker 等）应用于动态元素，
//和 popover 一样，在拼接元素之后就立即注册事件
```
#### 2.2 点击空白处 popover 消失
```javascript
/*点击空白处 popover 关闭*/
$('body').on('click', function (event) {
    var target = $(event.target).parent("a");
    if (!target.hasClass('popoverTrigger')) {
        $('.popoverTrigger').popover('hide');
    }
});
```
*popover 文档结构*

![popover 文档结构](/img/popover文档结构.png)

#### 2.3 展示 popover 
```javascript
/*详情*/
$(document).on("show.bs.popover", ".popoverTrigger", function (event) {
    let billCode = $(this).data("stockoutbillid"), //stockoutbillid: popover 的 id (能够唯一标识一个 popover )
        linkThis = $(this), 
        linkData = linkThis.data();
    $(".popoverTrigger:not([data-stockoutbillid=" + billCode + "])").popover("hide"); //隐藏其他 popover 弹出框
    let content =
        '客户编码：' + notNull(linkData.customercode) + '<br/>' +
        '客户名称：' + notNull(linkData.customername) + '<br/>' +
        '计划货物移动日期：' + jsonDateFormat(notNull(linkData.planmovetime)) + '<br/>' +
        '客户地址：' + notNull(linkData.customeradress) + '<br/>' +
        '收货地址：' + notNull(linkData.getproductadress) + '<br/>' +
        '收货人：' + notNull(linkData.getproductperson) + '<br/>' +
        '出货方式：' + notNull(linkData.sendproducttype) + '<br/>' +
        '客户订单号：' + notNull(linkData.customerbillcode);
    linkThis.attr("data-content", content)
});
```


### 3.

