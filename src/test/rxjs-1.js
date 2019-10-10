import { Observable } from 'rxjs'

const observable = new Observable(subscribe => {
    subscribe.next(1)
    subscribe.next(2)
    subscribe.next(3)
    setTimeout(_ => {
        subscribe.next(4)
        subscribe.complete()
    }, 1000)
})

console.log('just before subscribe')
observable.subscribe({
    next(x) {
        console.log('got value ' + x)
    },
    error(err) {
        console.log('something wrong occurred: ' + err)
    },
    complete() {
        console.log('done')
    }
})
console.log('jsut after subscribe')

Observable.create((obsever)=>{
    let i = 0;
    $.post('/api1',()=>{
        obsever.next(i++);
    })
    $.post('/api2',()=>{
        obsever.next(i++);
    })
    $.post('/api3',()=>{
        obsever.next(i++);
    })
}).subcribe((v)=>{
    if(v===3){
        console.log('请求全部发送成功')
    }
})