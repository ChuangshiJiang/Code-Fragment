##AJAX(Asynchromous Javascript and XML,异步的 JavaScript 和 XML)

***

#### 1.什么是 Ajax
>`AJAX` 不是新的编程语言，而是一种使用现有标准的新方法。
`AJAX` 最大的优点是在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。
`AJAX` 不需要任何浏览器插件，但需要用户允许`JavaScript`在浏览器上执行。

#### 2. Ajax 的工作原理
![ajax的工作原理](/img/ajax的工作原理.gif);

#### 3.AJAX - 创建 XMLHttpRequest 对象
>所有现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建 XMLHttpRequest 对象。（IE5 和 IE6 使用 ActiveXObject）。
XMLHttpRequest 用于在后台与服务器交换数据。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

*为了应对所有的现代浏览器，包括 IE5 和 IE6，请检查浏览器是否支持 XMLHttpRequest 对象。如果支持，则创建 XMLHttpRequest 对象。如果不支持，则创建 ActiveXObject ：*

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script>
function loadXMLDoc()
{
	var xmlhttp;
    if(window.XMLHttpRequest){
        // IE7+,FireFox,Chrome,Oprea,Safari
        xmlhttp = new XMLHttpRequest();
    }else{
        // IE6,IE5 
        xmlhttp = new ActiveXObject("Micorosoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET","/try/ajax/ajax_info.txt",true);
    xmlhttp.send();
}
</script>
</head>
<body>
    <div id="myDiv"><h2>使用 AJAX 修改该文本内容</h2></div>
    <button type="button" onclick="loadXMLDoc()">修改内容</button>
</body>
</html>
```
