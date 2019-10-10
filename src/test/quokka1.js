import { from } from 'rxjs'
import { map, mergeMap, pluck } from 'rxjs/operators'

const urls = ['movie', 'vip', 'quan']

const myPromise = url => new Promise(resolve => setTimeout(_ => resolve({data: `fetch ${url}`, url: 'url'}), 1000))

const urls$ = from(urls)
.pipe(
    map(v => 'https://' + v + 'xunlei.com'),
    mergeMap(v => myPromise(v)),
    pluck('data')
)
.subscribe(sub => {
    console.log(sub)
})