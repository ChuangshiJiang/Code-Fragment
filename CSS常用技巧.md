#CSS 常用技巧

### 1. css 鼠标悬浮才显示的样式
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