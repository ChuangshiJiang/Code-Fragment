#CSS 常用技巧

### 1. css 鼠标悬浮才显示的样式
`要求实现`：正常情况下，a 链接不显示，只有鼠标移到到上面或者 a  的父元素上才显示

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

*效果图如下*
![](/img/hover.gif)


### 2. 水印样式
*html 代码*
```html
<div>
    <div class="waterMark">
        <p>抽</p>
    </div>
</div>
```

*css 代码*
```css

div.page{
    height: 80mm;
    width: 100mm;
    overflow: hidden;
    margin: 2mm 2mm;
    border: 1px solid #ccc;
    padding: 3mm;
    padding-top: 0;
    display: inline-block;
}

/*水印图形*/
.waterMark {
    position: absolute;
    border: 5px solid #000;
    border-radius: 30mm;
    width: 24mm;
    height: 24mm;
    text-align: center;
    line-height: 24mm;
    font-weight: 900;
    font-size: 12mm;
    opacity: 0.15;
    transform: translate(269%,182%);
}

/*水印文字*/
.waterMark p {
    transform: rotate(-30deg);  /*控制水印旋转角度，这里为 -30 度（逆时针旋转30°）*/
    -moz-transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    margin: -5px 0 10px;
}
```

*效果图*
![水印效果图](/img/水印动图.gif)
