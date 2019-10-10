## 为Vue增加流事件处理-RxJS实践

### 异步？回调？承诺(Promise)?

[事件流的处理历史](https://insights.thoughtworks.cn/rxjs-quickstart/?utm_source=tuicool&utm_medium=referral)

```flow
st=>start: Start
op=>operation: Your Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
```

### Why Rxjs

1. Promise解决了只期望单值返回的异步请求: 不可中断与单值传递
2. RxJS能帮助我们优雅的处理异步操作，如Promises, callbacks , Web Workers, Web Sockets
3. RxJS异步数据流,对这好几个数据流进行合并等高级操作
4. 项目需要对 4 个网站的某个资源前 5 页的结果进行抓取。我用 rx 实现每次对一个网站的 5 页做平行请求，每个请求如果失败就重试，重试 3 次之后再放弃。完成一个网站 5 页抓取之后再进行下一个网站 5 页内容的抓取，最后收集结果保存。

### Vue Use Rxjs

为Vue提供流事件处理方式
