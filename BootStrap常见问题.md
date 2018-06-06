

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