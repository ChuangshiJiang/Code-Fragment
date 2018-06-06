
### 1. layer 加载层的关闭
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