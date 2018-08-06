
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
### 4. DataTables 表格列数过多，使用横向滚动条
*css*
```css
div.dataTables_wrapper {
    width: 100%;
    margin: 0 auto;
}

div.dataTables_wrapper th, td {
    white-space: nowrap;/*列内不允许字符串换行，否则会自适应*/
}
```
*javascript*
```javascript
$('#proQCTable').DataTable({
    "ajax": {
        "url": Auto.AjaxAgent.Material.GetBaseProductQualityInfoListForPaged.URL,
        "type": "POST",
        "data": function (data) {
            data.PagedDataFilter = JSON.stringify(BuildFilter("#dataFilterArea"));
        }
    },
    "scrollX": true,//允许datatables 横向滚动
    "columns": tableColumns,//列数据
});
```
### 5. DataTables 隐藏或者显示指定列
*html*
```html
<div class="box-body">
    <h4>显示指定质检列：</h4>
    <div class="">
        <div class="form-group">
            <label class="control-label">基本信息：</label>
            <div class="inline basicQCInfo">
                <button class="btn btn-xs btn-success showQCCol" data-column="SFC">膜卷号</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="Site">站点</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="Record_Type">收集工序</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="Thickness">规格厚度</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="RealWidth">规格宽度</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="Length">长度</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="FirstQualitylevel">初判质量等级</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="FirstBugCode">初判缺陷代码</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="FirstAppearanceDefect">初判外观缺陷1</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="FirstBugremark">初判不良说明</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="SecondQualitylevel">复判质量等级</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="SecondBugCode">复判缺陷代码</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="SecondBugremark">复判不良说明</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="ModifyQualitylevel">复判改判质量等级</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="LastQualitylevel">最终等级</button>
                <button class="btn btn-xs btn-success showQCCol" data-column="Width">宽度</button>
            </div>
        </div>
    </div>
    <table id="proQCTable" class="table table-striped table-bordered" cellspacing="0" style="width:100%;"></table>
</div>
```
*javascript*
```javascript
var table = $('#proQCTable').DataTable({
    "ajax": {
        "url": Auto.AjaxAgent.Material.GetBaseProductQualityInfoListForPaged.URL,
        "type": "POST",
        "data": function (data) {
            data.PagedDataFilter = JSON.stringify(BuildFilter("#dataFilterArea"));
        }
    },
    "scrollX": true,//允许datatables 横向滚动
    "columns": tableColumns,
});
//点击按钮，显示或者隐藏对应列
$(document).on("click", ".showQCCol", function () {
    let data_col = $(this).toggleClass("btn-success").data("column");
    let column = table.column("." + data_col);//table 指的是上面的 $('#proQCTable').DataTable({}) 变量
    column.visible(!column.visible());
});
```

### 6. 固定表格列
>需要使用插件 [fixedColumns](https://www.datatables.net/download/)
```javascript
//DataTables 表格
var table = $('#WorkOrderTable').DataTable({
    "ajax": {
        "url": Auto.AjaxAgent.Bill.GetWorkOrderForPaged.URL,
        "type": "POST",
        "data": function (data) {
            data.PagedDataFilter = JSON.stringify(BuildFilter("#dataFilterArea"));
        }
    },
    "scrollX": true,//允许datatables 横向滚动
    "columns": [
        { "render": Index, "orderable": false, },
        { "title": "基本信息", "orderable": false, "render": basicInfo, "width": "131px" },
        { "data": "WorkOrder_Id", "title": "进度信息", "orderable": false, "render": progressInfo },
    ],
}).on("draw", function () {
    /*表格重绘，bootstrap--popover 弹出框组件加载*/
    LoadPopover();
});

//使用插件
new $.fn.dataTable.FixedColumns(table, {
    "iLeftColumns": 2//固定表格前两列
});
```

### 7. 刷新表格数据，分页信息不会重置

```javascript
//每30秒重新加载表数据(分页留存)
var table = $('#example').DataTable( {
    ajax: "data.json"
} );
setInterval( function () {
    table.ajax.reload( null, false ); // 刷新表格数据，分页信息不会重置
    //table.ajax.reload(); 分页不留存
}, 30000 );
```
