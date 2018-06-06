
### 1. DataTables 控制行的隐藏或显示
```javascript
var showOrNot = function(){
    return false;//隐藏
    // return true //显示
}
"columns":[
    {"data":"xxx","title":"xxx","render":"xxx","bVisible":showOrNot}
]
```

### 2. DataTables 表格重绘事件
```
$("#...").DataTable({...}).on("draw",function(){
    //表格重绘时需要做的操作
});
```

### 3. DataTables 加载本地数据
```javascript
var refreshData = function(){
    let data = "";  //本地数据
    table.clear().rows.add(data).draw();
    //table:要刷新的表格
};
```