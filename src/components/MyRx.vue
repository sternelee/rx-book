<template>
    <div class="rx">
        <p>
            <span>姓名：{{ name$ }}</span>
            <span>年龄：{{ age$ }}</span>
            <button v-stream:click="setName$">点击递增年龄</button>
        </p>
        <p>
            <span>计时器： {{ count$ }} 秒</span>
            <span>fromPromise: {{ myPromise$ }}</span>
            <span>数组: {{ myArr$ }} </span>
            <button v-stream:click="{ subject: plugData$, data: 'my data'}">传递数据</button>
            <span>我的数据是：{{ myData$ }}</span>
        </p>
    </div>
</template>

<script>
import { Observable, of, Subject, interval, from } from 'rxjs'
import { map, startWith, scan, pluck } from 'rxjs/operators'
export default {
    name: 'Myinfo',
    domStreams: [
        'setName$',
        'plugData$'
    ],
    subscriptions () {
        return {
            name$: of('Vue-Rx'),
            age$: this.setName$.pipe(
                map(_ => 1),
                startWith(0),
                scan((total, change) => total + change)
            ),
            count$: interval(1000),
            myPromise$: from(this.getPromise()).pipe(startWith('这是个一Promise回调')),
            myArr$: from([1, 2, 3]),
            myPromises$: from([getInfo(), getUserinfo()]).pipe(map(v => v), mergeMap),
            myData$: this.plugData$.pipe(
                pluck('data')
            )
        }
    },
    methods: {
        getPromise() {
            return new Promise((resolve, reject) => {
                setTimeout(_ => {
                    resolve('my promise')
                }, 5000)
            })
        }
    }
}
</script>
<style>
.rx span{margin:0 10px;}
</style>
