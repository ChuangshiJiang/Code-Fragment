### 22. for in 语句

> `for in`语句可以用来遍历对象的所有属性的名字。糟糕的是，它也会遍历出所有从原型锁中继承而来的成员元素。这带来了糟糕的副作用：或许你只对数据成员感兴趣，但它却提供了一些方法函数。
> 每个 `for in` 语句的主体都应该被包围在一个用于过滤的`if`语句中。`if`语句可以选择某和特定的类型或某个范围内的值，它可以排除函数，或者排除从原型继承而来的属性。例如：

```javascript
for(name in object){
    if(object.hasownProperty(name)){
        ...
    }
}
```

### 23. map() 方法

> map() 方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。

```javascript
var data = [1, 2, 3, 4]

var arrayOfSquares = data.map(item => {
  return item * item
})

console.log(arrayOfSquares) // 1, 4, 9, 16
```

### 24. 对象深拷贝（递归调用）

```javascript
//先自定义一个判断元素类型的方法
function toType(elem) {
  return {}.toString
    .call(elem)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

//参数过滤函数
function filterNull(o) {
  for (let key in o) {
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
```

### 25. 判断对象是否为空

```javascript
//1.将json对象转化为json字符串，再判断该字符串是否为"{}"
var data = {}
var b = JSON.stringify(data) == '{}'
alert(b) //true

//2.for in 循环判断
var obj = {}
var b = function() {
  for (var key in obj) {
    return false
  }
  return true
}
alert(b()) //true

//3.Object.getOwnPropertyNames()方法
//此方法是使用Object对象的getOwnPropertyNames方法，获取到对象中的属性名,
//存到一个数组中，返回数组对象，我们可以通过判断数组的length来判断此对象是否为空
//注意：此方法不兼容ie8，其余浏览器没有测试
var data = {}
var arr = Object.getOwnPropertyNames(data)
alert(arr.length == 0) //true

//4.使用ES6的Object.keys()方法
//与4方法类似，是ES6的新方法, 返回值也是对象中属性名组成的数组
var data = {}
var arr = Object.keys(data)
alert(arr.length == 0) //true
```

### 26. Promise 技术实现脚本的异步加载

```javascript
// 执行脚本
function exec(src) {
  const script = document.createElement('script')
  script.src = src

  //返回一个独立的 promise
  return new Promise((resolve, reject) => {
    let done = false
    script.onload = script.onreadystatechange = () => {
      if (
        !done &&
        (!script.readState ||
          script.readySate === 'loaded' ||
          script.readyState === 'complete')
      ) {
        done = true
        //避免内存泄漏
        script.onload = script.onreadystatechange = null
        resolve(script)
      }
      script.onerror = reject
    }
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}

function asyncLoadJS(dependencies) {
  return Promise.all(dependencies.map(exec))
}

asyncLoadJS([
  'https://code.jquery.com/jquery-2.2.1.js',
  'https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js'
]).then(() => {
  console.log('all done')
})
```

### 27. 懒加载之虚拟代理

_所谓虚拟代理加载，即为真正加载的对象事先提供一个代理或者说占位符。最常见的场景是在图片的懒加载中，先用一种 loading 的图片占位，然后再用异步的方式加载图片。等真正图片加载完成后就填充进图片节点中去。_

```javascript
const lazyLoadImg = () => {
  const images = document.getElementsByTagName('img')
  for (let i = 0; i < images.length; i++) {
    if (images[i].getAttribute('data-src')) {
      images[i].setAttribute('src', images[i].getAttribute('data-src'))
      img.onload = () => img.removeAttribute('data-src')
    }
  }
}
```

### 28. import() 动态加载

```javascript
    document.getElementById('button001').addEventListener('click',()=>{
        import().then(res=>{
            alert('model load success');
        }).catch(err=>{
            console.log('model load error');
        });
    })
```

### 29.缓存的更新（查询参考：应用程序缓存清单）

每次载入一个设置了 mainfest 属性的 HTML 文件，浏览器都会触发"checking"事件,并通过网络载入该清单。

### 30.深度拷贝

**所谓深度克隆，就是当对象的某个属性值为 object 或 array 的时候，要获得一份 copy，而不是直接拿到引用值**

```javascript
function deepClone(origin, target) {
  //origin是被克隆对象，target是我们获得copy
  target = target || {}
  for (let key in origin) {
    //遍历源对象
    if (origin.hasOwnProperty(key)) {
      if (Array.isArray(origin[key])) {
        //如果是数组
        target[key] = []
        deepClone(origin[key], target[key])
      } else if (typeof origin[key] === 'object' && origin[key] !== null) {
        target[key] = {}
        deepClone(origin[key], target[key])
      } else {
        target[key] = origin[key]
      }
    }
  }
  return target;
}
```
